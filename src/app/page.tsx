import Link from "next/link";

export default function Home() {
  return (
    <>
    <div className="flex justify-between m-5">
      <h1 className="text-3xl">logo</h1>
      <button className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"><Link href="/profile">Profile</Link></button>
    </div>
    <div className="flex justify-center">
      <h1 className="text-3xl">Home Page</h1>
    </div>
    </>
  );
}
