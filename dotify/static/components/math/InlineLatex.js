import React from 'react'

class InlineLatex extends React.Component {
    render() {
        var math = katex.renderToString(this.props.latex);
        return (<span dangerouslySetInnerHTML={ {__html: math} }/>);
    }
}

module.exports = InlineLatex;
