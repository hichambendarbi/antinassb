import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import moment from 'moment'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FilterListIcon from '@material-ui/icons/FilterList'; 
import { connect } from 'react-redux';
import { getPosts } from '../../../controlers/post';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as PowerIcon} from '../../imgs/power-button.svg'


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { label: 'الناشر' },
  { label: 'البلد' },
  { label: 'الحالة' },
  { label: 'التاريخ' },
  { label: 'المجال' },
];

function EnhancedTableHead(props) {



  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell>
            <LabelHeadTabl>
              {headCell.label}
              {/* {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null} */}
            </LabelHeadTabl>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,

  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? { 
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
      id="barhead"
    >
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          لوحة التحكم و تسيير التبليغات
        </Typography>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

 const AllPosts = ({getPosts, post: { posts, loading }}) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Days pprops search Start
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  
  today = yyyy + '-' + mm + '-' + dd;
  var oneDay = dd-1;
  var yesterday = yyyy + '-' + mm + '-' + oneDay;
  var towDay = dd-2;
  var towDays = yyyy + '-' + mm + '-' + towDay;
  // Days pprops search End
  const [dataSearch, setdataSearch] = useState ({
    search: '',
    search2:'',
    search3:'',
    search4:''
   })

   const {
     search,
     search2,
     search3,
     search4
     } = dataSearch;

     const onSearch = e => {
        setdataSearch({
          ...dataSearch,
           [e.target.name]:e.target.value}
           )
      }
              // Search Into Table Filter
              let Test=[];
   
              if (posts === null || loading) {
                  // <div><ImgSpi alt="دلائل" src={require('../../imgs/spinner.gif')} /></div>
                  console.log("Spinner")
              }else{
                Test = posts.filter(
              (post) => {
                const query = dataSearch.search.toLowerCase();
                const query2 = dataSearch.search2.toLowerCase();
                const query3 = dataSearch.search3.toLowerCase();
                const query4 = dataSearch.search4.toLowerCase();
                return post.nameSpam.toLowerCase().indexOf(query)>=0 &&
                post.country.toLowerCase().indexOf(query2)>=0 &&
                post.date.toLowerCase().indexOf(query3)>=0 && 
                post.status.toLowerCase().indexOf(query4)>=0
              }
                );
              }

  useEffect(()=> { 
    getPosts();
}, [getPosts]);





  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };



  const emptyRows = rowsPerPage - Math.min(rowsPerPage, Test.length - page * rowsPerPage);

  const toPost = (row) => {
    localStorage.setItem('post', JSON.stringify(row))
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar />
        <BarSearch>
            <BarOne>
            <InputSearch name="search" value={search} onChange={e=> onSearch(e)} placeholder="إسم النصاب"/>
            <SelectOp id="countryoptin" name="search2" value={search2} onChange={e=> onSearch(e)}>
            <option selected value="" >جميع المدن</option>
                    <option value="سطات" >
                        سطات   
                    </option>
                    <option value="أكادير">
                        أكادير
                    </option>
                    <option value="أصيلة">
                        أصيلة   
                    </option>
                    <option value="أزرو">
                         أزرو
                    </option>       
                    <option value="أزيلال">
                        أزيلال 
                    </option>
                    <option value="أزمور">
                        أزمور 
                    </option>
                    <option value="بني ملال">
                        ابني ملالت 
                    </option>
                    <option value="بركان">
                        بركان 
                    </option>
                    <option value="بن طيب"> 
                       بن طيب 
                    </option>
                    <option value="الدار البيضاء"> 
                    الدار البيضاء 
                    </option>
                    <option value="شفشاون"> 
                    شفشاون 
                    </option>
                    <option value="الجديدة"> 
                    الجديدة 
                    </option>
                    <option value="الرشيدية"> 
                    الرشيدية 
                    </option>
                    <option value="الصويرة"> 
                    الصويرة 
                    </option>
                    <option value="فكيك"> 
                    فكيك 
                    </option>
                    <option value="فاس"> 
                    فاس 
                    </option>
                    <option value="كلميم"> 
                    كلميم 
                    </option>
                    <option value="الحسيمة"> 
                    الحسيمة 
                    </option>
                    <option value="إفران"> 
                    إفران 
                    </option>
                    <option value="إمزور"> 
                    إمزور 
                    </option>
                    <option value="إنزكان"> 
                    إنزكان 
                    </option>
                    <option value="القنيطرة"> 
                    القنيطرة 
                    </option>
                    <option value="الخميسات"> 
                    الخميسات 
                    </option>
                    <option value="خنيفرة"> 
                    خنيفرة 
                    </option>
                    <option value="خريبكة"> 
                    خريبكة 
                    </option>
                    <option value="القصر الكبير"> 
                    القصر الكبير 
                    </option>
                    <option value="العرائش"> 
                    العرائش 
                    </option>
                    <option value="مراكش"> 
                    مراكش 
                    </option>
                    <option value="مكناس"> 
                    مكناس 
                    </option>
                    <option value="المحمدية"> 
                    المحمدية 
                    </option>
                    <option value="ناظور"> 
                    ناظور 
                    </option>
                    <option value="ورززات"> 
                    ورززات 
                    </option>
                    <option value="وجدة"> 
                    وجدة 
                    </option>
                    <option value="الرباط"> 
                    الرباط 
                    </option>
                    <option value="أسفي"> 
                    أسفي 
                    </option>
                    <option value="سلا"> 
                    سلا 
                    </option>
                    <option value="صفرو"> 
                    صفرو 
                    </option>
                    <option value="طنجة"> 
                    طنجة 
                    </option>
                    <option value="طانطان"> 
                    طانطان 
                    </option>
                    <option value="طرفايا"> 
                    طرفايا 
                    </option>
                    <option value="تارودانت"> 
                    تارودانت 
                    </option>
                    <option value="تازة"> 
                    تازة 
                    </option>
                    <option value="تطوان"> 
                    تطوان 
                    </option>
                    <option value="تنزيت"> 
                    تنزيت 
                    </option>
                    <option value="زاكورة">  
                    زاكورة
                    </option>
            </SelectOp>
            </BarOne>
            <BarTow>
            <SelectOp id="dateoptin" name="search3" value={search3} onChange={e=> onSearch(e)}>
               <option value="">
                   التاريخ  
                </option>
                <option value={today}>
                    اليوم 
                </option>
                <option value={yesterday}>  
                    البارحة 
                </option>
                <option value={towDays}>  
                    قبل يومين
                </option>
            </SelectOp>

             <SelectOp id="dateoptin" name="search4" value={search4} onChange={e=> onSearch(e)}>
               <option value="">
                   الحالة  
                </option>
                <option value='ONLINE'>
                   ظاهر 
                </option>
                <option value='OFFLINE'>  
                   غير ظاهر 
                </option>
            </SelectOp> 
            </BarTow>
            <BarTr>
                <FilterListIcon/> 
            </BarTr>
        </BarSearch>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              rowCount={Test.length}
            />
            <TableBody>
              {stableSort(Test, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.name}
                    >
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.nameUser}
                      </TableCell>
                      <TableCell align="right">{row.country}</TableCell>
                      
                      {row.status==="ONLINE" ? 
                      <TableCell align="right" >
                      <Link to={`/administration/verifyNewPoste`} onClick={()=> toPost(row)}>
                        <PowerIcon width="20" height="20" fill="#2ed835"/>
                      </Link>
                        </TableCell> :
                    <TableCell align="right" >
                      <Link to={`/administration/verifyNewPoste`} onClick={()=> toPost(row)}>
                        <PowerIcon width="20" height="20" fill="red"/>
                      </Link>
                    </TableCell>
                      }
                      <TableCell align="right">{ moment(row.date).format('YYYY-MM-DD HH:MM') }</TableCell>
                      <TableCell align="right">{row.category}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={Test.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}


AllPosts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, {getPosts}) (AllPosts)

const LabelHeadTabl = styled.label`
font-size: 16px;
font-weight: 600;
`

const BarSearch = styled.div`
width: 70%;
display: flex;
justify-content: space-between;
padding: 16px;
flex-direction: row;
align-items: center;
@media(max-width: 700px) {
    flex-direction: column-reverse;
}
`

const BarOne = styled.div`
display: flex;
justify-content: space-between;
padding: 16px;
`

const BarTow = styled.div`
display: flex;
justify-content: space-between;
padding: 16px;
`

const BarTr = styled.div`
display: flex;
justify-content: space-between;
padding: 16px;
direction: rtl;
font-size: 18px;
`
const InputSearch = styled.input`
border: 1px solid black;
margin: 5px;
height: 30px;
direction: rtl;
padding: 0 5px;
`

const SelectOp = styled.select`
border: 1px solid black;
margin: 5px;
height: 30px;
direction: rtl;
`