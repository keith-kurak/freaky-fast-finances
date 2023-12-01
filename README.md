# Freaky Fast Finances
Presentation app for "Freaky Fast Full Stack with Firebase and Expo Router" at Michigan DevFest 2023.

## Setting up Firebase (for running locally)
The final project uses Firebase Firestore and email/ password authentication.
1. Go to the [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Create a new "Web app" (choose to add web hosting)
4. Copy the keys and such into **app/_layout.tsx**
5. Create a Firestore Database in "test" mode
6. Setup authentication with the "email / password" option
7. Create a test account

Check out my previously Freaky Fast Full-Stack workshop for detailed instructions with pictures for [setting up Firestore](https://github.com/keith-kurak/ferni-chat-2023/blob/main/exercises/03-read-write-firebase.md) and [setting up authentication](https://github.com/keith-kurak/ferni-chat-2023/blob/main/exercises/04-firebase-auth.md).

## Setting up Firebase / EAS (for deploy)
I'll get back to this, but for now you can follow my [workshop instructions](https://github.com/keith-kurak/ferni-chat-2023/blob/main/exercises/coda-deploy.md), they're practically the same. 

## How to run this
1. Run `npm install`
2. Run `npx expo start`
3. If you're running on your device, download Expo Go on it, and scan the QR code

If you just want to get something running without the Firebase setup, switch to the `basic-structure` branch. That doesn't connect to Firebase.

## Following the story
Check out the [closed pull requests](https://github.com/keith-kurak/freaky-fast-finances/pulls?q=is%3Apr+is%3Aclosed) and follow them in order to see how it's built.

## Slides
[presentation slides](https://docs.google.com/presentation/d/1vX8D2UF9OplqfrBoWoSSjZLMEnB9gMms_hJwExuTp5o/edit?usp=sharing)

