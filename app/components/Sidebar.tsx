import Image from 'next/image';
import Link from 'next/link';
import Homepage from "@/public/home_icon.svg"
import Area from "@/public/area_icon.svg"
import Logo from "@/public/logo.png"
import Processes from "@/public/process_icon.svg"
import Dashboard from "@/public/dashboard_icon.svg"

const Sidebar = () => {
  return (
    <div className="w-64 bg-[#21005E] text-white h-screen p-8">
      <Image src={Logo} alt='Logo' className='mb-10'/>
      <ul>
        <li className="mb-6">
          <Link href="/" className='flex items-center gap-3'>
            <Image src={Homepage} className='w-6' alt=''/>
            <p className="text-lg hover:text-gray-200">Home</p>
          </Link>
        </li>
        <li className='mb-6'>
          <Link href="/areas" className='flex items-center gap-3'>
            <Image src={Area} className='w-6' alt=''/>
            <p className="text-lg hover:text-gray-200">Áreas</p>
          </Link>
        </li>
        <li className='mb-6'>
          <Link href="/processes" className='flex items-center gap-3'>
            <Image src={Processes} className='w-6' alt=''/>
            <p className="text-lg hover:text-gray-200">Processos</p>
          </Link>
        </li>
        <li>
          <Link href="/dashboard" className='flex items-center gap-3'>
            <Image src={Dashboard} className='w-6' alt=''/>
            <p className="text-lg hover:text-gray-200">Dashboard</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;