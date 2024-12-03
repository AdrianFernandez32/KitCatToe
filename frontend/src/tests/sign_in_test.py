from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from utility import driver
from datetime import datetime
import os

def take_screenshot(driver, step_name):
    if not os.path.exists("src/tests/screenshots/sign_in/"):
        os.makedirs("src/tests/screenshots/sign_in/")
    timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    screenshot_path = f"src/tests/screenshots/sign_in/{step_name}_{timestamp}.png"
    driver.save_screenshot(screenshot_path)
    print(f"Screenshot saved at: {screenshot_path}")

# Verify that the main elements are present
def test_elements_present(driver):
    driver.get("http://localhost:3000")
    take_screenshot(driver, "login_page_loaded")

    assert driver.find_element(By.ID, "email")
    take_screenshot(driver, "email_field_present")

    assert driver.find_element(By.ID, "password")
    take_screenshot(driver, "password_field_present")

    assert driver.find_element(By.XPATH, "//button[contains(text(), 'Sign in')]")
    take_screenshot(driver, "signin_button_present")

# Verify functionality
def test_valid_login(driver):
    driver.get("http://localhost:3000")
    take_screenshot(driver, "login_page_loaded")

    email_field = driver.find_element(By.ID, "email")
    email_field.send_keys("testuser@company.com")
    take_screenshot(driver, "email_field_filled")

    password_field = driver.find_element(By.ID, "password")
    password_field.send_keys("password123")
    take_screenshot(driver, "password_field_filled")
    
    login_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Sign in')]")
    login_button.click()
    take_screenshot(driver, "signin_button_clicked")

    try:
        WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.XPATH, "//div[contains(text(), 'An error occurred. Please try again.')]"))
        )
        error_present = True
        take_screenshot(driver, "error_message_displayed")
    except TimeoutException:
        error_present = False
        take_screenshot(driver, "no_error_message")

    assert not error_present, "Error message was displayed when it shouldn't be."

# Verify redirection to register
def test_navigate_to_register(driver):
    driver.get("http://localhost:3000")
    take_screenshot(driver, "login_page_loaded")

    signup_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Sign up')]")
    signup_button.click()
    take_screenshot(driver, "signup_button_clicked")

    assert "register" in driver.current_url
    take_screenshot(driver, "register_page_loaded")
