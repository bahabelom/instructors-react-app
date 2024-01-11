
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './comps/Navbar';
import Home from './comps/Home';
import Login from './comps/Login';
import Register from './comps/Register';
import UserProfile from './comps/UserProfile';
import EvalutionPage from './comps/EvalutionPage';
import { Navigate } from "react-router-dom";
import { useAuthContext } from './hooks/useAuthContext';

import AdminDashboard from './comps/AdminDashboard';
import InstructorDashboard from './comps/InstructorDashboard ';


function App() {

  const {user} = useAuthContext()
 return (
   <div>
    <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/login" element={!user?<Login />:<Navigate to="/"/>} />
       <Route path="/register" element={!user?<Register />:<Navigate to="/"/>} />
       <Route path="/user_profile" element={<UserProfile />} />
       <Route path="/instructor_dashboard" element={user?<InstructorDashboard />: <Navigate to="/login"/>} />
       <Route path="/evaluation_page" element={user?<EvalutionPage />: <Navigate to="/login"/>} />
      </Routes>
     </div>
  );
}

export default App;



// const tigrinyaLettersHorizontal = [
//   ["ሀ", "ሁ", "ሂ", "ሃ", "ሄ", "ህ", "ሆ"],
//   ["ለ", "ሉ", "ሊ", "ላ", "ሌ", "ል", "ሎ"],
//   ["ሐ", "ሑ", "ሒ", "ሓ", "ሔ", "ሕ", "ሖ"],
//   ["መ", "ሙ", "ሚ", "ማ", "ሜ", "ም", "ሞ"],
//   ["ሠ", "ሡ", "ሢ", "ሣ", "ሤ", "ሥ", "ሦ"],
//   ["ረ", "ሩ", "ሪ", "ራ", "ሬ", "ር", "ሮ"],
//   ["ሰ", "ሱ", "ሲ", "ሳ", "ሴ", "ስ", "ሶ"],
//   ["ሸ", "ሹ", "ሺ", "ሻ", "ሼ", "ሽ", "ሾ"],
//   ["ቀ", "ቁ", "ቂ", "ቃ", "ቄ", "ቅ", "ቆ"],
//   ["በ", "ቡ", "ቢ", "ባ", "ቤ", "ብ", "ቦ"],
//   ["ቨ", "ቩ", "ቪ", "ቫ", "ቬ", "ቭ", "ቮ"],
//   ["ተ", "ቱ", "ቲ", "ታ", "ቴ", "ት", "ቶ"],
//   ["ቸ", "ቹ", "ቺ", "ቻ", "ቼ", "ች", "ቾ"],
//   ["ኀ", "ኁ", "ኂ", "ኃ", "ኄ", "ኅ", "ኆ"],
//   ["ነ", "ኑ", "ኒ", "ና", "ኔ", "ን", "ኖ"],
//   ["ኘ", "ኙ", "ኚ", "ኛ", "ኜ", "ኝ", "ኞ"],
//   ["አ", "ኡ", "ኢ", "ኣ", "ኤ", "እ", "ኦ"],
//   ["ከ", "ኩ", "ኪ", "ካ", "ኬ", "ክ", "ኮ"],
//   ["ኸ", "ኹ", "ኺ", "ኻ", "ኼ", "ኽ", "ኾ"],
//   ["ወ", "ው", "ዊ", "ዋ", "ዌ", "ው", "ዎ"],
//   ["ዐ", "ዑ", "ዒ", "ዓ", "ዔ", "ዕ", "ዖ"],
//   ["ዘ", "ዙ", "ዚ", "ዛ", "ዜ", "ዝ", "ዞ"],
//   ["ዠ", "ዡ", "ዢ", "ዣ", "ዤ", "ዥ", "ዦ"],
//   ["የ", "ዩ", "ዪ", "ያ", "ዬ", "ይ", "ዮ"],
//   ["ደ", "ዱ", "ዲ", "ዳ", "ዴ", "ድ", "ዶ"],
//   ["ጀ", "ጁ", "ጂ", "ጃ", "ጄ", "ጅ", "ጆ"],
//   ["ገ", "ጉ", "ጊ", "ጋ", "ጌ", "ግ", "ጎ"],
//   ["ጠ", "ጡ", "ጢ", "ጣ", "ጤ", "ጥ", "ጦ"],
//   ["ጨ", "ጩ", "ጪ", "ጫ", "ጬ", "ጭ", "ጮ"],
//   ["ጰ", "ጱ", "ጲ", "ጳ", "ጴ", "ጵ", "ጶ"],
//   ["ጸ", "ጹ", "ጺ", "ጻ", "ጼ", "ጽ", "ጾ"],
//   ["ፀ", "ፁ", "ፂ", "ፃ", "ፄ", "ፅ", "ፆ"],
//   ["ፈ", "ፉ", "ፊ", "ፋ", "ፌ", "ፍ", "ፎ"],
//   ["ፐ", "ፑ", "ፒ", "ፓ", "ፔ", "ፕ", "ፖ"]
//  ];
 