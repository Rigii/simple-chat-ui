import React, { useEffect, useRef } from "react";
import { Card, List, ListItem } from "flowbite-react";
import { strings } from "./../strings";
import { useUserContext } from "../../../context/user-context/use-user-context";
import type {
  IChatRoom,
  IRoomMessage,
} from "../../../context/chat-context/types";

export const RoomMessagesBlock: React.FC<{
  messages: IRoomMessage[];
  currentRoom: IChatRoom | null;
  onlineParticipants: string[] | undefined;
}> = ({ messages, currentRoom, onlineParticipants }) => {
  const { user } = useUserContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  if (!currentRoom || !user || messages.length === 0) {
    return (
      <Card className="h-full flex items-center justify-center">
        <div className="text-center text-gray-400">
          <p className="text-lg">{strings.noMessages}</p>
          <p className="text-sm mt-2">{strings.startConversation}</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="flex-1">
      <div className="h-full overflow-y-auto p-4">
        <List className="border-0 space-y-3">
          {messages.map((msg) => {
            const isOwnMessage = msg.nickname === user.nickname;

            const marker = onlineParticipants?.includes(msg.participantPublicId)
              ? "marker:text-green-500"
              : "marker:text-gray-500";

            return (
              <ListItem
                key={msg._id}
                className={`
                    p-3 border-0
                ${marker}
                    ${
                      isOwnMessage
                        ? "bg-blue-50 dark:bg-blue-900/20 ml-auto"
                        : "bg-gray-50 dark:bg-gray-700 mr-auto"
                    }
                    max-w-[80%] rounded-2xl
                  `}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <span
                      className={`
                        text-xs font-medium
                        ${
                          isOwnMessage
                            ? "text-blue-600 dark:text-blue-300"
                            : "text-gray-600 dark:text-gray-300"
                        }
                      `}
                    >
                      {msg.nickname}
                      {isOwnMessage && " (You)"}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {msg.created
                        ? new Date(msg.created).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </span>
                  </div>

                  <p
                    className={`
                      text-sm mt-1
                      ${
                        isOwnMessage
                          ? "text-gray-800 dark:text-gray-200"
                          : "text-gray-700 dark:text-gray-300"
                      }
                    `}
                  >
                    {msg.message}
                  </p>

                  <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {msg.created
                      ? new Date(msg.created).toLocaleDateString()
                      : ""}
                  </span>
                </div>
              </ListItem>
            );
          })}
          <div ref={messagesEndRef} />
        </List>
      </div>
    </div>
  );
};
