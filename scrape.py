from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import time
import pandas as pd

def address_Addition(address1, new_df):
    address_list = address1.split(',')
    new_df['address'] = address_list[0]
    new_df['city'] = address_list[1]
    return new_df

def get_review_summary(result_set):
    rev_dict = {
        'Review Name': [],
        'Review Text': []
    }
    for result in result_set:
        review_name = result.find(class_='d4r55').text
        review_text = result.find('span', class_='wiI7pd').text
        rev_dict['Review Name'].append(review_name)
        rev_dict['Review Text'].append(review_text)
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

    SCROLL_PAUSE_TIME = 5
    scroll_attempts = 5

    # Find and click the "Reviews" tab
    try:
        reviews_tab = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//button[contains(., 'Reviews')]"))
        )
        reviews_tab.click()
        time.sleep(3)
    except Exception as e:
        print(f"Error clicking Reviews tab: {e}")
        continue

    # Scroll through reviews
    for _ in range(scroll_attempts):
        ele = driver.find_element(By.XPATH, '//div[contains(@class, "m6QErb")]')
        driver.execute_script('arguments[0].scrollTop = arguments[0].scrollHeight', ele)
        time.sleep(SCROLL_PAUSE_TIME)

    # Click "More" buttons
    more_buttons = driver.find_elements(By.XPATH, '//button[contains(., "More")]')
    for button in more_buttons:
        try:
            button.click()
            time.sleep(1)
        except:
            pass

    # Extract reviews
    response = BeautifulSoup(driver.page_source, 'html.parser')
    review_elements = response.find_all('div', class_='jftiEf')

    df = get_review_summary(review_elements)
    df_with_address = address_Addition(address, df)

    final_df1 = pd.concat([final_df1, df_with_address], axis=0, ignore_index=True)

driver.quit()
print(final_df1)
