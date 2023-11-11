# --- Pseudocode ---
# FOR loop:
# Set counter to 1
# Break at 100
# Increment by 1
# 	IF number MOD 15 == 0	
# 		PRINT FizzBuzz	
# 	If number MOD 3 == 0
# 		PRINT Fizz
# 	If number MOD 5 == 0
# 		PRINT Buzz
# 	Else
# 		print number

# --- Actual Python Code ---
for x in range(1, 101):
	if (x % 15 == 0):
		print("FizzBuzz")
	elif (x % 3 == 0):
		print("Fizz")
	elif (x % 5 == 0):
		print("Buzz")
	else:
		print(x)	