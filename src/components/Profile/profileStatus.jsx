import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStatusFormInfoAsync } from '../../redux/reducers/profile';
import { cutTooLongString } from '../../utils/utils';
import loading from './../../assets/loading.gif';
import './status.scss'


const ProfileStatus = React.memo(({status, userId, followed}) => {

    const dispatch = useDispatch();
    const statusloading = useSelector(state => state.ProfileData.statusloading)

    const [isAddingStatus, setisAddingStatus] = useState(false);
    const [mystatus, setmystatus] = useState(null);
    const [value, setvalue] = useState('');

    useEffect(() => {
        setmystatus(status)
        setvalue(status)
        return () => {
            setmystatus(null)
        }
    }, [status])

    const addNewStatus = () => {
        dispatch(addStatusFormInfoAsync(value))
        setisAddingStatus(false)
    }

    return (
        <div className='statusBlock'>
            {/* <div className="h4">status</div> */}
            {!isAddingStatus ?
            <div>
                <span 
                className='status' 
                title={!userId ? "on double click" : ""} 
                onDoubleClick={() => !userId ? setisAddingStatus(true): ''}
                style={{backgroundColor:  followed ? 'rgb(138, 185, 45)' : 'rgb(50, 156, 205)'}}
                >
                    {!statusloading ? 
                    <span>
                        {
                        mystatus ? 
                        cutTooLongString(mystatus, 185):
                        <div className='noStatus'>no status</div>
                        }
                    </span>:
                    <img src={loading} alt="loading" />
                    }
                </span>
            </div>:
            <div>
                <textarea className="statusInput" autoFocus onBlur={() => addNewStatus()} onChange={(e) => setvalue(e.target.value)} value={value}/>
            </div>
            }
        </div>
    )
});


export default ProfileStatus;