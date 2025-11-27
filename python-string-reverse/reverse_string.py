# Python program to reverse a string using user input
# Manual reversal without using built-in reverse methods like slicing [::-1]

def reverse_string(s):
    reversed_str = ""
    for char in s:
        reversed_str = char + reversed_str
    return reversed_str

# Get input from user
user_input = input("Enter a string to reverse: ")

# Reverse the string
reversed_input = reverse_string(user_input)

# Print the result
print("Original string:", user_input)
print("Reversed string:", reversed_input)
