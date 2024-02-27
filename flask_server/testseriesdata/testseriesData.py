import random

table_info = { 'common_instructions' : r"Read each question carefully before selecting your answer. Choose the correct option by marking the corresponding circle on the answer sheet.There is no negative marking for incorrect answers.",
'common_duration' : r"1 hour"}

test_title_link_data = [
    {
        "title": "General Knowledge Test",
        "link": "/gernalknowledge",
        # "duration": common_duration,
        # "instructions": common_instructions,
    },
    {
        "title": "Math Test",
        "link": "/mathematics",
        # "duration": common_duration,
        # "instructions": common_instructions,
    },
    {
        "title": "Aptitude Test",
        "link": "/aptitudetest",
        # "duration": common_duration,
        # "instructions": common_instructions,
    },
    {
        "title": "Science Test",
        "link": "/sciencetest",
        # "duration": common_duration,
        # "instructions": common_instructions,
    },
    {
        "title": "English Test",
        "link": "/englishtest",
        # "duration": common_duration,
        # "instructions": common_instructions,
    },
    {
        "title": "Python Test",
        "link": "/pythontest",
        # "duration": common_duration,
        # "instructions": common_instructions,
    },
    {
        "title": "Java Test",
        "link": "/javatest",
        # "duration": common_duration,
        # "instructions": common_instructions,
    },
    {
        "title": "History Test",
        "link": "/historytest",
        # "duration": common_duration,
        # "instructions": common_instructions,
    },
        {
        "title": "Chemistry Test",
        "link": "/chemistrytest",
        # "duration": common_duration,
        # "instructions": common_instructions,
    },
]


# def generate_test_table(test_name_prefix):
#     return [
#         {"id": 1, "test_name": f"{test_name_prefix}1", "link": f"/{test_name_prefix.lower()}1"},
#         {"id": 2, "test_name": f"{test_name_prefix}2", "link": f"/{test_name_prefix.lower()}2"},
#         {"id": 3, "test_name": f"{test_name_prefix}3", "link": f"/{test_name_prefix.lower()}3"},
#     ]

# test_gk_table = generate_test_table("Test")
# test_mathematics_table = generate_test_table("Test")
# test_python_table = generate_test_table("Test")

def generate_test_table(test_name_prefix="Test", num_ids=3):
    # actuakky load data from database
    return [
        {"id": i, "test_name": f"{test_name_prefix}{i}", "link": f"{test_name_prefix.lower()}{i}", 'ScorePercentage': round(random.uniform(0.0, 100.0), 2), 'viewAnalytics':rf"{test_name_prefix.lower()}{i}"}
        for i in range(1, num_ids + 1)
    ]

test_gernalknowledge_table = generate_test_table()
test_mathematics_table = generate_test_table("MathTest")
test_python_table = generate_test_table("PythonTest", num_ids=5)

questions_data = [
    {
        "question": "What is the capital of France?",
        "options": ['Paris', 'London', 'Berlin', 'Madrid'],
        "answer": "Paris"
    },
    {
        "question": "Which planet is known as the Red Planet?, Which planet is known as the Red Planet?, Which planet is known as the Red Planet?",
        "options": ['Mars', 'Venus', 'Jupiter', 'Mercury'],
        "answer": "Mars"
    },
    {
        "question": "Who wrote 'Romeo and Juliet'?",
        "options": ['William Shakespeare', 'Jane Austen', 'Charles Dickens', 'Leo Tolstoy'],
        "answer": "William Shakespeare"
    },
    {
        "question": "What is the largest mammal in the world?",
        "options": ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
        "answer": "Blue Whale"
    },
    {
        "question": "In which year did World War II end?",
        "options": ['1943', '1945', '1950', '1960'],
        "answer": "1945"
    },
    {
        "question": "Who discovered penicillin?",
        "options": ['Marie Curie', 'Alexander Fleming', 'Louis Pasteur', 'Antoine Lavoisier'],
        "answer": "Alexander Fleming"
    },
    {
        "question": "What is the largest planet in our solar system?",
        "options": ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        "answer": "Jupiter"
    },
    {
        "question": "Who painted the Mona Lisa?",
        "options": ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Claude Monet'],
        "answer": "Leonardo da Vinci"
    },
    {
        "question": "In which year did the Titanic sink?",
        "options": ['1912', '1905', '1923', '1931'],
        "answer": "1912"
    },
    {
        "question": "What is the capital of Japan?",
        "options": ['Seoul', 'Beijing', 'Tokyo', 'Bangkok'],
        "answer": "Tokyo"
    },
    {
        "question": "Who developed the theory of relativity?",
        "options": ['Isaac Newton', 'Albert Einstein', 'Galileo Galilei', 'Stephen Hawking'],
        "answer": "Albert Einstein"
    }
]




answered_MCQs = [
    {'question': 'What is the capital of France?', 'options': ['Paris', 'London', 'Berlin', 'Madrid'], 'selectedOption': 'Paris', 'answer': 'Paris'},
    {'question': 'Which planet is known as the Red Planet?', 'options': ['Mars', 'Venus', 'Jupiter', 'Mercury'], 'selectedOption': 'Mars', 'answer': 'Mars'},
    {'question': "Who wrote 'Romeo and Juliet'?", 'options': ['William Shakespeare', 'Jane Austen', 'Charles Dickens', 'Leo Tolstoy'], 'selectedOption': 'William Shakespeare', 'answer': 'William Shakespeare'},
    {'question': 'What is the largest mammal in the world?', 'options': ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'], 'selectedOption': 'Blue Whale', 'answer': 'Blue Whale'},
    {'question': 'In which year did World War II end?', 'options': ['1943', '1945', '1950', '1960'], 'selectedOption': '1945', 'answer': '1945'},
    {'question': 'Who discovered penicillin?', 'options': ['Marie Curie', 'Alexander Fleming', 'Louis Pasteur', 'Antoine Lavoisier'], 'selectedOption': 'Alexander Fleming', 'answer': 'Alexander Fleming'},
    {'question': 'What is the largest planet in our solar system?', 'options': ['Venus', 'Mars', 'Jupiter', 'Saturn'], 'selectedOption': 'Jupiter', 'answer': 'Jupiter'},
    {'question': 'Who painted the Mona Lisa?', 'options': ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Claude Monet'], 'selectedOption': 'Leonardo da Vinci', 'answer': 'Leonardo da Vinci'},
    {'question': 'In which year did the Titanic sink?', 'options': ['1912', '1905', '1923', '1931'], 'selectedOption': '1905', 'answer': '1912'},
    {'question': 'What is the capital of Japan?', 'options': ['Seoul', 'Beijing', 'Tokyo', 'Bangkok'], 'selectedOption': 'Tokyo', 'answer': 'Tokyo'},
    {'question': 'Who developed the theory of relativity?', 'options': ['Isaac Newton', 'Albert Einstein', 'Galileo Galilei', 'Stephen Hawking'], 'answer': 'Albert Einstein'}
]

statistics = {
    'correctAnswersCount': 0,
    'totalQuestions': 11,
    'accuracy': 0,
    'timeTaken': 3,
    'timeRemaining': 297
}
