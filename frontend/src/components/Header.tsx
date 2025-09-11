import logo from "../assets/logo.ico"

const Header = () => {
    return (
 <div className="flex items-center justify-between -mt-6">
    <div className="flex relative ml-10">
<img src={logo} className="w-34 h-34 cursor-pointer"/>
<h2 className="mt-12 text-3xl font-bold absolute left-28 text-blue-400 cursor-pointer">LearnStack</h2>
    </div>

<div className="flex gap-8 mr-18">
    <button className="py-3 px-6 rounded-2xl border cursor-pointer">Login</button>
    <button className="py-3 px-6 rounded-2xl border bg-blue-500 cursor-pointer">SignUp</button>
</div>

        </div>
    )
}

export default Header;