from selenium.webdriver.common.by import By
from utility import driver

# Verify that the main elements are present
def test_elements_present(driver):
    driver.get("http://localhost:3000")

    assert driver.find_element(By.ID, "email")
    assert driver.find_element(By.ID, "password")

    assert driver.find_element(By.XPATH, "//button[contains(text(), 'Sign in')]")

# Verify functionality
def test_valid_login(driver):
    driver.get("http://localhost:3000")

    email_field = driver.find_element(By.ID, "email")
    email_field.send_keys("testuser@company.com")

    password_field = driver.find_element(By.ID, "password")
    password_field.send_keys("password123")
    
    login_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Sign in')]")
    login_button.click()

    assert "email" in driver.current_url

# Verify redirection to register
def test_navigate_to_register(driver):
    driver.get("http://localhost:3000")

    signup_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Sign up')]")
    signup_button.click()

    assert "register" in driver.current_url