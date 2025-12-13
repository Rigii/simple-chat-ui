# Simple Chat

**Simple Chat** is a multi-room chat application created for demonstration and technology testing purposes.

## Start the Application

1. Clone the Git repository.
2. Add a `.env` file with the required environment variables to the root directory.
3. Install dependencies: `npm install`
4. Run the app locally: `npm run dev`
5. When stopping localhost, terminate the connection using: c.

**NB!** Always kill the port using `npm run kill` when stopping the application.

## User Flow

1. **Registration**  
   To use the chat, the user must first register by entering an email and a nickname.

2. **Join Chat Rooms**  
   Initially, the user sees a list of available chat rooms.  
   To get access to a room, the user simply clicks on the chat room item.  
   This action registers the user in the selected chat room and adds them to the list of interlocutors.  
   A new chat room card will then appear in the **Joined Rooms** section.

3. **Enter a Chat Room**  
   By clicking a chat room card, the user navigates to the selected chat room screen.  
   At this point, the user joins the chat room via a socket connection.

The user will be able to:

- write and receive real-time messages
- review interlocutor statuses
