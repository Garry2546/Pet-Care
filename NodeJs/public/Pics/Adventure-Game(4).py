# --- My Test Based Adventure Game ---
import time, os

print("Loading. . . .")
time.sleep(2)

playerSettings = {
	" name":os.getlogin(),
	"characterName": "",
	"characterAge": 520
}

print("Welcome to my game " + playerSettings.get("name") + "\nPlease choose a character: ")

characterList = ["Knight", "Warrior", "Wizard"]

for idx, val in enumerate(characterList, start = 1):
	print(" " + str(idx) + ". " + val)

character = int(input("Type in your character number: "))
playerSettings["characterName"] = characterList[character - 1]

print("You chose: " + playerSettings.get("characterName"))

settingsMenu = ['Player Name', 'Character Name', 'Character Age', 'View Current Settings']

while True:
	menu = int(input("\nWould you like to start the adventure or change settings? "))

	if (menu == 1):
		move = input("\n" + playerSettings["characterName"] + ", do you want to move? ")

		count = 0
		while move in ('Yes', 'yes', 'YES', 'y', 'Y'):
			print("You moved forwards 1 space!")
			move = input("Keep moving? ")
			count += 1
		else:
			print("You moved " + str(count) + " spaces. Congrats!")
			break

	elif (menu == 2):
		for idx, val in enumerate(settingsMenu, start = 1):
			print(" " + str(idx) + ". " + val)

		settingChange = int(input("What do you want to change? "))

		if (settingChange == 1):
			playerSettings["name"] = input("Please enter a new name: ")
			print("Thanks "+ playerSettings["name"] + ". Enjoy the Game!")
		elif (settingChange == 2):
			print("")	
		elif (settingChange == 3):
			print("")
		elif (settingChange == 4):
			print("Name: " + playerSettings["name"] + "\nCharacter Name: " + playerSettings["characterName"] + "\nCharacter Age: " + str(playerSettings["characterAge"]))
	else:
		print("Not a valid input! Try again!")











