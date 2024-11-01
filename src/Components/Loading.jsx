import React from 'react';

const Loading = () => {
    return (
        <>
            <div className="fixed top-0 left-0 bg-white flex items-center justify-center w-full">
                <div className="flex  z-50 items-center justify-center h-screen flex-row gap-5">
                    <div className="w-7 h-7 rounded-full bg-yellow animate-bounce"></div>
                    <div className="w-7 h-7 rounded-full bg-yellow animate-bounce [animation-delay:-.3s]"></div>
                    <div className="w-7 h-7 rounded-full bg-yellow animate-bounce [animation-delay:-.5s]"></div>
                </div>
            </div>
        </>
    );
}

export default Loading;
