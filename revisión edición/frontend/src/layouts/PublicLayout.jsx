import Footer from 'components/Footer';
import NavBar from 'components/Navbar';

const PublicLayout=({children})=>{
    return(
        <div className="flex flex-col justify-between h-screen">
            <NavBar/>
            <main className="h-full overflow-y-scroll bg-blue-400">
                {children}
            </main>    
            <Footer/>
        </div>
    )
};

export default PublicLayout;