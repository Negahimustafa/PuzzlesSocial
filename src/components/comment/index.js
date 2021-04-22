import React from 'react'

export default function Comment({username, caption}) {
    return (
        <div className="comment">
            <p>
                <span style={{ fontWeight: "600", color: "black", marginRight: "9px" }}>{username} :</span>{caption}
            </p>
        </div>
    )
}
