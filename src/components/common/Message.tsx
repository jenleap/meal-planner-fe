import React, { PropsWithChildren } from 'react';
import { Alert } from 'react-bootstrap';

type MessageProps = {
    variant: string;
}

function Message({ variant, children }: PropsWithChildren<MessageProps>) {
    return (
        <Alert variant={ variant }>
            { children }
        </Alert>
    )
}

export default Message;
