import React from 'react';
import Markdown from 'react-native-markdown-renderer';
import { View } from 'react-native';

const MarkdownRenderer = (props) => {
    return (
        <View>
            {
                !!props.markdown && props.markdown.length > 0 &&
                <Markdown>{props.markdown}</Markdown>
            }
        </View>
    );
};

export default MarkdownRenderer;