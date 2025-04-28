import { useState } from "react";

const MessageCell = ({ message }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleMessage = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="max-w-[250px] break-words whitespace-normal">
            {isExpanded ? message : `${message.slice(0, 200)}`}
            <span className="text-blue-400 cursor-pointer" onClick={() => toggleMessage()}>{message.length > 200 && (isExpanded ? " Show Less" : " ...Show More")}</span>
        </div>
    );
};

export default MessageCell;