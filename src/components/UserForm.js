import React, { useState } from 'react'
import './UserForm.css'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux';
import { addUser, selectUsers, userEditFlg, removeUser, updateUser,getUser } from '../features/user/UserReducer';


function UserForm() {
  
    const userList = useSelector(selectUsers);
    const userEditFlag = useSelector(userEditFlg);
    const dispatch = useDispatch();

    const initialUserData = {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        txtEmpPhone: '',
        gender: 'female'
    }
    const [formData, setFormData] = useState(initialUserData);
    const { register, handleSubmit, formState: { errors }, getValues, watch, reset } = useForm();


    function onSubmit(data) {
        // display form data on success

        if (userEditFlag) {
            dispatch(updateUser(data))
        } else {
            dispatch(addUser(data))
        }

        reset();
        setFormData(initialUserData);
        return false;
    }

  
    function handleChange(evt) {
        const value = evt.target.value;
        setFormData({
          ...formData,
          [evt.target.name]: value
        });
      }

      function getEditUserData(id) {
        dispatch(getUser());
        userList.filter(user => {
            return user.id === id ? setFormData(user) : '';
        })

       
      }
    return (
        <div>
            <div className="user-ragistration">
                <div className="container register">
                    <div className="row">
                        <div className="col-md-3 register-left">
                            {/* <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" /> */}
                            <h3>Welcome</h3>
                            <p>You are 30 seconds away from earning your own money!</p>
                            <input type="submit" name="" defaultValue="Login" />
                            <br />
                        </div>
                        <div className="col-md-9 register-right">
                            <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a
                                        className="nav-link active"
                                        id="home-tab"
                                        data-toggle="tab"
                                        href="#home"
                                        role="tab"
                                        aria-controls="home"
                                        aria-selected="true"
                                    >
                                        Employee
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        id="profile-tab"
                                        data-toggle="tab"
                                        href="#profile"
                                        role="tab"
                                        aria-controls="profile"
                                        aria-selected="false"
                                    >
                                        Hirer
                                    </a>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div
                                    className="tab-pane fade show active"
                                    id="home"
                                    role="tabpanel"
                                    aria-labelledby="home-tab"
                                >
                                    <h3 className="register-heading">Apply as a Employee</h3>
                                    <form onSubmit={handleSubmit(onSubmit)} className="row register-form">


                                        {userEditFlag === true ?
                                            <input {...register('id')} className='hide-cls'
                                                type="text" value={formData.id}
                                            /> : ''}
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input {...register('firstName', { required: true })}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="First Name *"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                   
                                                />
                                                {errors?.firstName?.type === "required" && (
                                                    <p>First name is required</p>
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <input {...register('lastName')}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Last Name *"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input {...register('password', { required: true, minLength: 5 })}
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Password *"
                                                    onChange={handleChange}
                                                />
                                                {errors?.password?.type === "required" && (
                                                    <p>Password is required</p>
                                                )}
                                                {errors?.password?.type === "minLength" && (
                                                    <p>password cannot less than 5 characters</p>
                                                )}
                                            </div>

                                            <div className="form-group">
                                                <div className="maxl">
                                                    <label className="radio inline">
                                                        <input {...register('gender', { required: true })}
                                                            type="radio"
                                                            name="gender"
                                                            value="male"
                                                          
                                                            // checked={formData.gender === 'male' && formData.gender !=='' ? 'checked' : ''}
                                                        />
                                                        <span> Male </span>
                                                    </label>
                                                    <label className="radio inline">
                                                        <input {...register('gender', { required: true })} type="radio" name="gender"  value="female"
                                                        
                                                        // checked={formData.gender === 'female' && formData.gender !=='' ? 'checked' : ''}
                                                        />
                                                        <span>Female </span>
                                                    </label>


                                                    {errors?.gender?.type === "required" && (
                                                        <p>Gender is required</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input {...register('email', { required: true, minLength: 11 })}
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Your Email *"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />

                                                {errors?.email?.type === "required" && (
                                                    <p>Email is required</p>
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <input {...register('txtEmpPhone', { required: true, minLength: 10, maxLength: 10 })}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Your Phone *"
                                                    value={formData.txtEmpPhone}
                                                    onChange={handleChange}
                                                />

                                                {errors?.txtEmpPhone?.type === "required" && (
                                                    <p>Phone number is required</p>
                                                )}

                                                {errors?.txtEmpPhone?.type === "minLength" && (
                                                    <p>Min Length is 10</p>
                                                )}
                                                {errors?.txtEmpPhone?.type === "maxLength" && (
                                                    <p>Max Length is 10</p>
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <input {...register('confirmPassword', { required: true })}
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Confirm Password *"
                                                 
                                                />

                                                {errors?.confirmPassword?.type === "required" && (
                                                    <p>Password is required</p>
                                                )}

                                                {watch("confirmPassword") !== watch("password") &&
                                                    getValues("confirmPassword") ? (
                                                    <p>password not match</p>
                                                ) : null}
                                            </div>

                                            <button type='submit' className="btnRegister" attr=''>
                                                {userEditFlag === true ? 'Update' : 'Register'}

                                            </button>

                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <h4 className='user-list-table-head'>User List</h4>
                    </div>

                    <div className='row'>


                        <table className="table table-bordered user-table">
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Gender</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>


                                {
                                    userList.length > 0 ?
                                        userList.map((user) => {
                                            return (

                                                <tr key={user.id}>
                                                    <td>{user.firstName} </td>
                                                    <td>{user.lastName} </td>
                                                    <td>{user.email} </td>
                                                    <td>{user.txtEmpPhone}</td>
                                                    <td>{user.gender}</td>
                                                    <td>
                                                        <button onClick={() => dispatch(removeUser(user.id))}>
                                                            <i className="fas fa-trash"></i>
                                                        </button>
                                                        <button onClick={() => getEditUserData(user.id)}>
                                                            <i className="fas fa-edit"></i>
                                                        </button>
                                                    </td>
                                                </tr>

                                            )


                                        })
                                        : <tr><td colSpan={5}>Empty users list</td></tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UserForm