const UserProfile = ({onClose}) => {
    return (    
     <div>
     
      <div class="flex flex-col justify-center items-center h-screen min-h-full">
        <div class="w-full max-w-md bg-white shadow-md rounded-md">
          <h1>Student Profile</h1>
          <div class="mt-8 flex flex-row justify-center items-center">
            <h2>John Doe</h2>
            <p class="text-gray-500">Computer Science</p>
          </div>
          <div class="mt-8 flex flex-col justify-center items-center">
            <h3>Courses Taken</h3>
            <ul class="mt-4">
              <li class="text-gray-500">CS 101: Introduction to Computer Science</li>
              <li class="text-gray-500">CS 102: Data Structures and Algorithms</li>
              <li class="text-gray-500">CS 103: Software Engineering</li>
            </ul>
          </div>
          <div class="mt-8 flex flex-col justify-center items-center">
            <h3>Instructor Evaluations</h3>
            <ul class="mt-4">
              <li class="text-gray-500">CS 101: Professor Smith</li>
              <li class="text-gray-500">CS 102: Professor Jones</li>
              <li class="text-gray-500">CS 103: Professor Williams</li>
            </ul>
          </div>
        </div>
      </div>
        </div>      
     );
}
 
export default UserProfile;