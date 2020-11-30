import React from 'react';
import MDEditor from '@uiw/react-md-editor';

const ParagraphChallenge = (props) => {
    return (
        <div className="no-print">
            <div className="columns" style={{backgroundColor:'#ffffff', padding:10, borderRadius: 5}}>
                <div className="column">
                <MDEditor.Markdown source={props.challenge.paragraphText} />
                </div>
            </div>
         </div>
    );
};

export default ParagraphChallenge;