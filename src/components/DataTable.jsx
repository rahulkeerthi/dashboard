/* eslint-disable react/jsx-props-no-spreading */

// React
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

// Material UI Components and Icons
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import Avatar from '@material-ui/core/Avatar';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Check from '@material-ui/icons/Check';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import HomeIcon from '@material-ui/icons/Home';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

// Third Party
import Swal from 'sweetalert2';

const axios = require('axios').default;
const moment = require('moment');
const RandExp = require('randexp');

// Material Table uses forwardRef to obtain the refs and
// forward it to the icon components that it renders
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

function DataTable({ title, headers, kids, providers, providersTable }) {
  // Get the number of active enrollments (provider enrollments containing a matching child record)
  // providerData is dependent on this
  const getActiveEnrollments = (enrollments) => {
    const active = enrollments.filter((enrol) => {
      return kids.some((child) => {
        return child.slug === enrol.childSlug;
      });
    });
    return active.length;
  };

  // Map providers API data to Material Table fields
  const providerData = providers.map(
    ({
      slug,
      name,
      address,
      city,
      avatarURL,
      email,
      postcode,
      dob,
      enrollments,
      registrationDate,
    }) => {
      return {
        providerSlug: slug,
        name,
        email,
        address,
        city,
        image: avatarURL,
        postcode,
        dob,
        enrollments: enrollments.length,
        active: getActiveEnrollments(enrollments),
        registrationDate,
      };
    },
  );

  // Map children API data to Material Table fields
  const childrenData = kids.map(({ slug, name, guardians }) => {
    const provider = providers.find((prov) => {
      return prov.enrollments.find((enrol) => {
        return enrol.childSlug === slug;
      });
    });
    const enrollment = provider.enrollments.find((enrol) => {
      return enrol.childSlug === slug;
    });
    return {
      childSlug: slug,
      name,
      startDate: enrollment.startDate,
      guardiansCount: guardians.length,
    };
  });

  // Get the child data (name and guardians) for a particlar provider
  const getChildren = (slug) => {
    const provider = providers.find((prov) => {
      return prov.slug === slug;
    });
    const enrollments = kids.filter((child) => {
      return provider.enrollments.find((enrol) => {
        return child.slug === enrol.childSlug;
      });
    });
    const result = enrollments.map(({ name, guardians }) => {
      return {
        name,
        guardiansCount: guardians.length,
      };
    });
    return result;
  };

  // Get the guardian data (name, image and contact) for a particlar child
  const getGuardian = (slug) => {
    const selectedChild = kids.find((child) => {
      return child.slug === slug;
    });
    const result = selectedChild.guardians.map(({ name, email, avatarURL }) => {
      return {
        image: avatarURL,
        name,
        email,
      };
    });
    return result;
  };

  // Generate a random slug using a prefix (prv_, chd_ or grd_) and rand string generator
  const generateSlug = (prefix) => {
    const uniqueSlug = prefix + new RandExp(/\S{16}/).gen();
    if (
      providers.find((provider) => {
        return provider.slug === uniqueSlug;
      })
    ) {
      // Recursively call the generator if the slug is not unique
      generateSlug(prefix);
    }
    return uniqueSlug;
  };

  // Check that the birthday given makes the provider 18 or older (uses Moment)
  const checkBirthday = (dob) => {
    const now = moment();
    const birthdate = moment(dob);
    return moment.duration(now - birthdate).asYears() > 17;
  };

  // Handle the addition of a new provider by posting to the API
  async function handleAddProvider({ name, email, dob }) {
    // Generate a unique slug
    const uniqueSlug = generateSlug('prv_');
    const postUrl = 'http://localhost:3001/providers';
    // Check birthday and return error if under 18
    if (checkBirthday(dob)) {
      const postData = {
        // ? Had to generate a fake id as json-server requires one for POST requests
        // ? Running a custom json-server with slug as id doesn't seem to work properly
        // ? (see server.js file)
        id: Math.floor(Math.random() * 1000),
        slug: uniqueSlug,
        name,
        email,
        dob,
        //  Uses a fake avatar
        avatarURL: `https://i.pravatar.cc/150`,
        // Sets all other values to null / empty
        postcode: null,
        address: null,
        city: null,
        registrationDate: null,
        enrollments: [],
      };
      axios({
        method: 'post',
        headers: {
          ContentType: 'application/json',
        },
        url: postUrl,
        data: postData,
      })
        // deal with success and failure
        .then(() => {
          Swal.fire({
            title: 'Success!',
            text: 'New provider added!',
            icon: 'success',
            confirmButtonText: 'tiney steps!',
          });
        })
        .catch((err) => {
          Swal.fire({
            title: 'Error!',
            text: err.message,
            icon: 'error',
            confirmButtonText: 'Sorry...',
          });
        });
    } else {
      // Deal with validation error (fixed error message in this case)
      // TODO: Additional validation and respective error messages
      Swal.fire({
        title: 'Error!',
        text: 'Provider must be over the age of 18!',
        icon: 'error',
        confirmButtonText: 'Gotcha',
      });
    }
  }

  return (
    <div style={{ maxWidth: '100%' }}>
      <MaterialTable
        icons={tableIcons}
        title={title}
        options={{ search: true, filtering: true }}
        columns={headers}
        data={providersTable ? providerData : childrenData}
        // makes data editable, only deals with adding a new row
        editable={{
          // * Adding new providers writes to db as intended but table needs refreshing
          // * Unable to re-render table, considering making component stateful
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                handleAddProvider(newData);
                resolve();
              }, 1000);
            }),
          // TODO: Add update and delete methods
          onRowUpdate: null,
          onRowDelete: null,
        }}
        // Detail panel dropdowns for both provider and children views
        // Uses providersTable toggle to decide what to render or data to use
        detailPanel={[
          {
            icon: providersTable ? ChildCareIcon : HomeIcon,
            tooltip: providersTable ? 'Enrollment Info' : 'Guardian Info',
            render: (rowData) => {
              return (
                <div>
                  <MaterialTable
                    columns={
                      providersTable
                        ? [
                            {
                              title: 'Child Name',
                              field: 'name',
                            },
                            { title: 'Guardians', field: 'guardiansCount', type: 'numeric' },
                          ]
                        : [
                            {
                              title: 'Guardian Picture',
                              field: 'image',
                              render: ({ name, image }) => <Avatar alt={name} src={image} />,
                            },
                            { title: 'Guardian Name', field: 'name' },
                            { title: 'Email', field: 'email' },
                          ]
                    }
                    data={
                      providersTable
                        ? getChildren(rowData.providerSlug)
                        : getGuardian(rowData.childSlug)
                    }
                    options={{
                      search: false,
                      filtering: false,
                      paging: false,
                      sorting: false,
                      toolbar: false,
                      showTitle: false,
                    }}
                  />
                </div>
              );
            },
          },
          {
            // Disables profile detail tab for children
            disabled: !providersTable,
            icon: AssignmentIndIcon,
            tooltip: 'More Details',
            render: ({ address, city, postcode, registrationDate }) => {
              return (
                <div>
                  <MaterialTable
                    columns={[
                      { title: 'Address', field: 'address' },
                      { title: 'City', field: 'city' },
                      { title: 'Postcode', field: 'postcode' },
                      {
                        title: 'Registration Date',
                        field: 'registrationDate',
                        type: 'date',
                      },
                    ]}
                    data={[
                      {
                        // Sets default value if data not provided (particularly registration date)
                        address: address || 'No data available',
                        city: city || 'No data available',
                        postcode: postcode || 'No data available',
                        registrationDate: registrationDate || 'No data available',
                      },
                    ]}
                    options={{
                      search: false,
                      filtering: false,
                      paging: false,
                      sorting: false,
                      toolbar: false,
                      showTitle: false,
                    }}
                  />
                </div>
              );
            },
          },
        ]}
      />
    </div>
  );
}

DataTable.propTypes = {
  title: PropTypes.string.isRequired,
  headers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  kids: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      guardians: PropTypes.shape({
        slug: PropTypes.string,
        name: PropTypes.string,
        email: PropTypes.string,
        avatarURL: PropTypes.string,
      }),
    }),
  ).isRequired,
  providers: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      avatarURL: PropTypes.string,
      postcode: PropTypes.string,
      address: PropTypes.string,
      city: PropTypes.string,
      dob: PropTypes.string,
      registrationDate: PropTypes.string,
      enrollments: PropTypes.arrayOf(
        PropTypes.shape({
          childSlug: PropTypes.string,
          startDate: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
  providersTable: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  image: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  address: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  city: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  postcode: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  registrationDate: PropTypes.string.isRequired,
};

export default DataTable;
