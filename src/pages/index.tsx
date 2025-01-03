import { Route } from '@solidjs/router'
import MainPage from './MainPage'
import LoginPage from './LoginPage'
import SigninPage from './SigninPage'
import MycontentPage from './MycontentPage'
import WorkplacePage from './WorkplacePage'
import PlayPage from './PlayPage'


const Pages = () => {
  return (
    <>
        <Route path="/" component={MainPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signin" component={SigninPage} />
        <Route path="/mycontent" component={MycontentPage} />
        <Route path="/workplace" component={WorkplacePage} />
        <Route path="/play" component={PlayPage} />
    </>
  )
}

export default Pages