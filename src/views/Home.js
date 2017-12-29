import React, {Component} from 'react';

class HomeView extends Component {
    constructor (props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        alert('hello world!');
    }

    render() {
        return (
            <div>
                Home
                <button onClick={this.onClick}>Click me</button>
            </div>
        );
    }
}

export default HomeView;
