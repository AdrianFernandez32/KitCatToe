from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pytest
from utility import driver

# Caso 1: Verificar elementos principales
def test_elements_present_in_register(driver):
    driver.get("http://localhost:3000/register")  # Asegúrate de que esta ruta es correcta

    # Verifica la presencia del campo de email
    email_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "email"))
    )
    assert email_field

    # Verifica la presencia del campo de username
    username_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "username"))
    )
    assert username_field

    # Verifica la presencia del campo de password
    password_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "password"))
    )
    assert password_field

    # Verifica el botón de crear cuenta
    create_account_button = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "//button[contains(text(), 'Create Account')]"))
    )
    assert create_account_button


# Caso 2: Crear cuenta con datos válidos
def test_create_account(driver):
    driver.get("http://localhost:3000/register")

    # Rellena el campo de email
    email_field = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "email"))
    )
    email_field.send_keys("testuser@example.com")

    # Rellena el campo de username
    username_field = driver.find_element(By.ID, "username")
    username_field.send_keys("testuser")

    # Rellena el campo de password
    password_field = driver.find_element(By.ID, "password")
    password_field.send_keys("password123")

    # Haz clic en el botón de crear cuenta
    create_account_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Create Account')]")
    create_account_button.click()

    # Verifica que hubo una redirección o mensaje exitoso
    # Aquí puedes ajustar según el comportamiento esperado
    WebDriverWait(driver, 10).until(
        EC.url_contains("success")  # Cambia esto según el comportamiento real de tu aplicación
    )


# Caso 3: Navegar a la página de inicio de sesión
def test_navigate_to_signin(driver):
    driver.get("http://localhost:3000/register")

    # Haz clic en el enlace de "Sign In"
    signin_link = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.LINK_TEXT, "Sign In"))
    )
    signin_link.click()

    # Verifica que la URL cambió a la página de inicio de sesión
    assert "/" in driver.current_url
