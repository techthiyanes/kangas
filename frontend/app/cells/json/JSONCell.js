import DialogueModal from '../../modals/DialogueModal/DialogueModalClient';

import classNames from 'classnames/bind';
import styles from '../Cell.module.scss';

const cx = classNames.bind(styles);

const JSONCell = ({ value, query, style, expanded=false }) => {

    const cell = (
            <div className={cx("cell-content")} style={style}>
                <pre>
                    {JSON.stringify(value)}
                </pre>
            </div>
    );

    const cellExpanded = (
            <div className={cx("cell-json-expanded")} style={style}>
                <pre>
                    {JSON.stringify(value, null, 4)}
                </pre>
            </div>
    );


    if (!!query?.groupBy)
        return (<></>);
    else
        return (
            <DialogueModal toggleElement={cell}>
                {cellExpanded}
            </DialogueModal>
        );

};

export default JSONCell;
