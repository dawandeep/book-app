import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import config from '../../config';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { useBooksContext } from '../context/useBooksContext';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'
const Headers = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  let email = localStorage.getItem("email")
  const [users,setUsers]=useState();
  const {dispatch}=useBooksContext()
  useEffect(()=>{
        axios.get(`${config.authapi}/user/${email}`,{
           headers: {
        'Authorization': localStorage.getItem('token')
      }
        })
        .then((res)=>{
            setUsers(res.data)
        })
        .catch((err)=>{
        })
    },[email])
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  let navigate = useNavigate()
   const {authState,authDispatch}=useBooksContext()
    const Logout = () => {
        authDispatch({ type: 'LOGOUT' });
        dispatch({type:"SET_FAVORITE",payload:[]})
        localStorage.clear()
        navigate('/')
    }
  return (
    <div>
     <AppBar position="static" sx={{backgroundColor:"#CD9CFF"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BOOK APP
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {
              authState ?    <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
            <MenuItem onClick={handleCloseNavMenu}>
            <Button component={Link} to='/'>Home</Button>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <Button component={Link} to='/favorite'>Favorite</Button>
            </MenuItem>
          </Menu> : <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
            <MenuItem onClick={handleCloseNavMenu}>
             <Button color="inherit" component={Link} to="/">Home</Button>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
           <Button color="inherit" component={Link} to="/login">Login</Button>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <Button color="inherit" component={Link} to="/register">Register</Button>
            </MenuItem>
          </Menu> 
            }
         
          </Box>
          
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            id="bapp"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            BOOK APP
          </Typography>
          {
            authState ?<><Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
                component={Link}
                to='/'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Home
              </Button>
              <Button
                component={Link}
                to='/favorite'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Favorite
              </Button>
           </Box>
           <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
               <Typography
            variant="span"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              flexGrow: 1,
              fontWeight: 300,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Welcome {users?.firstname}
          </Typography>
                <Avatar alt={users?.firstname} src={`http://localhost:7000/uploads/${users?.image}`}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Button id="itt" onClick={()=>navigate(`/user/${localStorage.getItem('email')}`)}>Account</Button>
                </MenuItem>
                <MenuItem  onClick={handleCloseUserMenu}>
                  <Button  onClick={()=>navigate(`/changePassword/${users?._id}`)}>Change Password</Button>
                </MenuItem>
            {
              authState ? <MenuItem onClick={handleCloseUserMenu}>
                  <Button id="btnlggt" onClick={Logout}>Logout</Button>
                </MenuItem>: <MenuItem onClick={handleCloseUserMenu}>
                  <Button component={Link} to='/login' >Login</Button>
                </MenuItem>
            }
                 
            </Menu>
          </Box>
          </>
          : <>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
                component={Link}
                to='/'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Home
              </Button>
              <Button
                id="log"
                component={Link}
                to='/login'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to='/register'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Register
              </Button>
           </Box>
          </>
          }
          </Toolbar>
      </Container>
    </AppBar>
    </div>
  )
}

export default Headers