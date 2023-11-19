import pytest
from app.routes import create_app

@pytest.fixture
def client():
    app = create_app({'TESTING': True})
    with app.test_client() as client:
        yield client

def test_home_page(client):
    """ Example test for the home page route """
    response = client.get('/')
    assert response.status_code == 200
    assert b"Welcome" in response.data