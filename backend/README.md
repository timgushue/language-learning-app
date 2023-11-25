# Language Learning App Backend

This is the backend repository for the Language Learning App, an application designed to facilitate language learning through interactive ChatGPT sessions.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:
- Python 3.8 or higher
- [Poetry](https://python-poetry.org/docs/), for dependency management

### Installing

1. **Clone the Repository**

    ```bash
    git clone https://github.com/timgushue/language-learning-app.git
    cd language-learning-app/backend
    ```

2. **Install Dependencies**

    Run the following command to install the project dependencies:

    ```bash
    poetry install
    ```

    This command will create a new virtual environment and install all the required packages as specified in the `pyproject.toml` file.

3. **Activate the Virtual Environment**

    To activate the virtual environment managed by Poetry, run:

    ```bash
    poetry shell
    ```

    This will spawn a new shell subprocess, which is configured to use the virtual environment.

### Running the Application

After setting up the project, you can run the application locally. Depending on the framework and the setup, the command may vary. For example, if you're using Flask:

```bash
flask run
```

### Running the Tests

```bash
poetry run pytest
```