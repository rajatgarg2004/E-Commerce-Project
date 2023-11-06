import React from 'react';

const Profile= ()=>{
    let result = JSON.parse(localStorage.getItem('user'));
    return (
        
        <div className="main">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossOrigin="anonymous"></link>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css"></link>
        <h2>IDENTITY</h2>
        <div className="card">
            <div className="card-body">
                <table>
                    <tbody>
                        <tr id="C4">
                            <td>Name</td>
                            <td>:</td>
                            <td>{result.name}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>:</td>
                            <td>{result.email}</td>
                        </tr>
                        <tr>
                            <td>Hobbies</td>
                            <td>:</td>
                            <td>Listening Music, Swimming, Lawn Tennis</td>
                        </tr>
                        <tr>
                            <td>Job</td>
                            <td>:</td>
                            <td>Student</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <section id="contact">
            <div className="text-center social-icons">
                <ul className="horizontal-list">

                    <li>
                        <a href="https://www.linkedin.com/in/rajat-garg-72b15a226/" target="_blank">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </li>

                    <li>
                        <a href="https://google.com/" target="_blank">
                            <i className="fab fa-google"></i>
                        </a>
                    </li>

                    <li>
                        <a href="https://www.facebook.com/profile.php?id=100004253651416" target="_blank">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                    </li>

                    <li>
                        <a href="https://github.com/rajatgarg2004" target="_blank">
                            <i className="fab fa-github"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://leetcode.com/rajatgarg2004/" target="_blank">
                        <button>LC</button>
                        </a>
                    </li>
                    <li className="abcdef" style={{"marginRight":"0px"}}>
                        <a href="https://www.codechef.com/users/yeetgod68" target="_blank">
                        <button>CC</button>
                        </a>
                    </li>
                    

                </ul>
            </div>
        </section>
    </div>
    );
}
export default Profile;