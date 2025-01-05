import React, { useEffect, useState } from 'react';

function Chat({ friendToChat }) {
    const [msg, setMsg] = useState('');

    useEffect(() => {
        setMsg('');
    }, [friendToChat])
;  return (
    <div>
        <input type='text' value={msg} onChange={(e) => { setMsg(e.target.value)}} placeholder={friendToChat}></input>
    </div>
  )
}

export default Chat
