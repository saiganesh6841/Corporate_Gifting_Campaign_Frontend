import React, { useEffect, useRef } from "react";
import { Avatar, Text } from "@fluentui/react-components";
import { useStyles } from "./styles/style";

const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const ChatMessages = ({ messages }) => {
  const styles = useStyles();

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={styles.container} ref={scrollRef}>
      <div className={styles.messageWrapper}>
        {messages.map((msg, index) =>
          msg.isAdminCreated ? (
            <div key={index} className={styles.messageRowRight}>
              <div className={styles.rightRowTop}>
                <Text className={styles.nameLabel}>{msg.fullName}</Text>
                <Avatar
                  name={msg.fullName}
                  image={{ src: msg.profileImage }}
                  className={styles.avatar}
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <div className={styles.messageBubble}>
                {msg.message}
                <div className={styles.timestampRight}>
                  {formatTime(msg.createdAt)}
                </div>
              </div>
            </div>
          ) : (
            <div key={index} className={styles.messageRowLeft}>
              <div className={styles.leftRowTop}>
                <Avatar
                  name={msg.fullName}
                  image={{ src: msg.profileImage }}
                  className={styles.avatar}
                  style={{ borderRadius: "50%" }}
                />
                <Text className={styles.nameLabel}>{msg.fullName}</Text>
              </div>
              <div className={styles.messageBubble}>
                {msg.message}
                <div className={styles.timestamp}>
                  {formatTime(msg.createdAt)}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ChatMessages;
