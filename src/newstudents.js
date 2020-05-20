import React from 'react';

class Newstudent extends React.Component {
    render() {
        return (
            <div>
                <script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></script><iframe class="airtable-embed airtable-dynamic-height" src="https://airtable.com/embed/shrObi9YDZAtBdTFh?backgroundColor=yellow" frameborder="0" onmousewheel="" width="100%" height="835"></iframe>
                <button type="button" onClick={() => window.location.reload(false)}>Refresh</button>
            </div>
        );
    }
}
export default Newstudent;