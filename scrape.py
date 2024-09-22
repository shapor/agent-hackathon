from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException, TimeoutException
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import time
import pandas as pd
import re
import sys

def address_Addition(address1, new_df):
    address_list = address1.split(',')
    new_df['address'] = address_list[0]
    new_df['city'] = address_list[1]
    return new_df

def get_review_summary(result_set):
    rev_dict = {
        'Review Name': [],
        'Review Text': [],
        'Stars': []
    }
    for result in result_set:
        review_name = result.find(class_='d4r55').text
        review_text = result.find('span', class_='wiI7pd').text

        # Extract the number of stars
        stars_element = result.find('span', class_='kvMYJc')
        stars = 0
        if stars_element:
            aria_label = stars_element.get('aria-label', '')
            stars_match = re.search(r'(\d+) stars?', aria_label)
            if stars_match:
                stars = int(stars_match.group(1))

        rev_dict['Review Name'].append(review_name)
        rev_dict['Review Text'].append(review_text)
        rev_dict['Stars'].append(stars)
        print(f"Got {stars} Star review from {review_name}: {review_text}")
    return pd.DataFrame(rev_dict)

driver = webdriver.Chrome()
url = ['https://www.google.com/maps/place/R+%26+L+Plumbing/@37.7134393,-122.4436298,15z/data=!4m6!3m5!1s0x808f7fa7d6712dfd:0xd455fc87d60b9b24!8m2!3d37.7134393!4d-122.4436298!16s%2Fg%2F11b6d4dr67']

final_df1 = pd.DataFrame()

for i, single_url in enumerate(url):
    driver.get(single_url)
    time.sleep(5)

    # Finding the address of the location
    response = BeautifulSoup(driver.page_source, 'html.parser')
    address = response.find('div', class_='rogA2c').text
    print(f"found address {address}")

    SCROLL_PAUSE_TIME = 2
    MAX_SCROLL_ATTEMPTS = 200  # Increased to allow for more scrolling

    # Find and click the "Reviews" tab
    try:
        reviews_tab = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//button[contains(., 'Reviews')]"))
        )
        reviews_tab.click()
        time.sleep(3)
    except Exception as e:
        print(f"Error clicking Reviews tab: {e}", file=sys.stderr)
        continue

    # Scroll through reviews
    last_review_count = 0
    scroll_attempts = 0
    no_new_reviews_count = 0

    while scroll_attempts < MAX_SCROLL_ATTEMPTS:
        print(f"scrolling... (attempt {scroll_attempts + 1})", file=sys.stderr)
        scroll_attempts += 1

        # Try to find the scrollable element
        try:
            scrollable_div = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.XPATH, "//div[@role='main']//div[contains(@class, 'DxyBCb')]"))
            )
            driver.execute_script("arguments[0].scrollTop = arguments[0].scrollHeight", scrollable_div)
        except:
            print("Could not find scrollable element, scrolling whole page", file=sys.stderr)
            # If we can't find the scrollable div, try scrolling the whole page
            driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.END)

        time.sleep(SCROLL_PAUSE_TIME)

        # Count the number of reviews
        review_elements = driver.find_elements(By.XPATH, '//div[contains(@class, "jftiEf")]')
        current_review_count = len(review_elements)

        print(f"Current review count: {current_review_count}", file=sys.stderr)

        if current_review_count > last_review_count:
            last_review_count = current_review_count
            no_new_reviews_count = 0
        else:
            no_new_reviews_count += 1

        if no_new_reviews_count >= 5:  # If no new reviews loaded after 5 attempts, we've probably reached the end
            print("No new reviews loaded after multiple attempts. Assuming all reviews are loaded.", file=sys.stderr)
            break

    print(f"Total reviews found: {last_review_count}", file=sys.stderr)

    # Click "More" buttons
    print("clicking more...", file=sys.stderr)
    try:
        more_buttons = driver.find_elements(By.XPATH, '//button[contains(@class, "w8nwRe") and contains(., "More")]')
        for button in more_buttons:
            driver.execute_script("arguments[0].click();", button)
            time.sleep(0.5)
    except Exception as e:
        print(f"Error clicking 'More' buttons: {e}", file=sys.stderr)

    # Extract reviews
    response = BeautifulSoup(driver.page_source, 'html.parser')
    review_elements = response.find_all('div', class_='jftiEf')

    df = get_review_summary(review_elements)
    df_with_address = address_Addition(address, df)

    final_df1 = pd.concat([final_df1, df_with_address], axis=0, ignore_index=True)

driver.quit()
print(final_df1)
