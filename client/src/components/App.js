// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import NotificationContainer from '../containers/Notification';
import Spinner from '../containers/Spinner';
import Modal from '../components/common/Modal';
import Chat from '../containers/Chat';
import ContextMenus from './common/ContextMenu';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Spinner/>
                <NotificationContainer props/>
                <Modal/>
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;
