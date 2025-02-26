import Link from "next/link"

const Login = () => {
  return (
    <div className="h-calc-page">
      Login
      <Link href="/auth/signup">sign up</Link>
    </div>
  )
}

export default Login
