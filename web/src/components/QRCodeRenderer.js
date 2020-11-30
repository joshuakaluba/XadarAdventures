import React from "react";
import QRCode from 'qrcode.react';
import PrimaryButton from './PrimaryButton';
import Config from './../Config';

const QRCodeRenderer = (props) => {
    const challengeId = !!props.challenge && !!props.challenge.id ? props.challenge.id : '';
    const url = `${Config.apiUrl}/Home/Download/#${challengeId}`;
    return (
        <div>
            <div id="qrcode">
                <QRCode value={url} />
            </div>
            <div className="no-print">
                {
                    props.showPrintButton &&
                    <PrimaryButton text={'Print'} onClick={() => window.print()} />
                }
            </div>
        </div>

    );
};

export default QRCodeRenderer;
