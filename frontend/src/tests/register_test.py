from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pytest
from utility import driver
from datetime import datetime
import os

def take_screenshot(driver, step_name):
    if not os.path.exists("src/tests/screenshots/register/"):
        os.makedirs("src/tests/screenshots/register/")
    timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    screenshot_path = f"src/tests/screenshots/register/{step_name}_{timestamp}.png"
    driver.save_screenshot(screenshot_path)
    print(f"Screenshot saved at: {screenshot_path}")

# Caso 1: Verificar elementos principales
def test_elements_present_in_register(driver):
    driver.get("http://localhost:3000/register")
    take_screenshot(driver, "register_page_loaded")

    email_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "email"))
    )
    assert email_field
    take_screenshot(driver, "email_field_present")

    nickname_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "nickname"))
    )
    assert nickname_field
    take_screenshot(driver, "nickname_field_present")

    password_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "password"))
    )
    assert password_field
    take_screenshot(driver, "password_field_present")

    create_account_button = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "//button[contains(text(), 'Create Account')]"))
    )
    assert create_account_button
    take_screenshot(driver, "create_account_button_present")


# Caso 2: Crear cuenta con datos válidos
def test_create_account(driver):
    driver.get("http://localhost:3000/register")
    take_screenshot(driver, "register_page_loaded")

    email_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "email"))
    )
    email_field.send_keys("testuser@example.com")
    take_screenshot(driver, "email_field_filled")

    nickname_field = driver.find_element(By.ID, "nickname")
    nickname_field.send_keys("testuser")
    take_screenshot(driver, "nickname_field_filled")

    password_field = driver.find_element(By.ID, "password")
    password_field.send_keys("password123")
    take_screenshot(driver, "password_field_filled")

    create_account_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Create Account')]")
    create_account_button.click()
    take_screenshot(driver, "create_account_button_clicked")

    WebDriverWait(driver, 10).until(
        EC.url_contains("/")
    )
    take_screenshot(driver, "registration_success")


# Caso 3: Navegar a la página de inicio de sesión
def test_navigate_to_signin(driver):
    driver.get("http://localhost:3000/register")
    take_screenshot(driver, "register_page_loaded")

    signin_link = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.LINK_TEXT, "Sign In"))
    )
    signin_link.click()
    take_screenshot(driver, "signin_link_clicked")

    assert "/" in driver.current_url
    take_screenshot(driver, "signin_page_loaded")
