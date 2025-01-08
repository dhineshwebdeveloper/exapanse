import React from 'react'
import notransaction from "../assets/img/notransaction.png"
const NoTransaction = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                flexDirection: "column",
                marginBottom: "2rem"
            }}
        >
            <img src={notransaction}
                style={{
                    width: "400px",
                    margin: "0rem 4rem"

                }}
                alt="notransaction" />
                <p style={{textAlign:"center", fontSize:"1.2rem" }}>
                    You Have NO Transaction Currently
                </p>
        </div>
    )
}

export default NoTransaction