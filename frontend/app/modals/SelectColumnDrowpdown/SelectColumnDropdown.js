'use client';

import { useCallback, useContext, useMemo } from 'react';
import Select from 'react-select';
import { ViewContext } from '../../contexts/ViewContext';
import useQueryParams from '../../../lib/hooks/useQueryParams';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import styles from './SelectColumnDropdown.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const SortArrow = ({ toggle, sortDesc }) => {
    return (
        <div className='arrow-toggle' onClick={toggle}>
            { sortDesc && <KeyboardArrowDownIcon /> }
            { !sortDesc && <KeyboardArrowUpIcon /> }
        </div>
    )
}

const SelectColumnDropdown = ({ toggleOpen }) => {
    const { params, updateParams } = useQueryParams();
    const { columns } = useContext(ViewContext)

    const toggleDesc = useCallback(() => {
        updateParam({ param: 'sortDesc', value: !params?.sortDesc })
    }, [updateParams]);

    const group = useCallback((e) => {
        updateParams({
            groupBy: e.value,
            sortBy: e.value
        });
        toggleOpen();
    }, [updateParams, toggleOpen]);

    // React select requires an array of dictionaries as input
    const options = useMemo(
        () =>
            Object.keys(columns).map((col, i) => {
                // For dropdown selectors, we add an empty cell at id: 0, hence the i + 1 below
                return { id: i + 1, label: col, value: col };
            }),
        [columns]
    );

    return (
        <div>
            baby
            <div className={cx('select-modal-title')}>
                <div>Select a column</div>
                <div
                    className={`reset-button ${
                        false ? 'enabled' : 'disabled'
                    }`}
                >
                    Reset to default
                </div>
            </div>
            <div className={cx('select-modal-body')}>
                <Select
                    options={options}
                    onChange={group}

                />
                { !!params?.sortBy && <SortArrow toggle={toggleDesc} sortDesc={params?.sortDesc} /> }
            </div>
        </div>

    )

}

export default SelectColumnDropdown;