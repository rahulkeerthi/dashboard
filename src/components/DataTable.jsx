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
        registrationDate,
      };
    },
  );

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
  return (
    <div style={{ maxWidth: '100%' }}>
      <MaterialTable
        icons={tableIcons}
        title={title}
        options={{ search: true, filtering: true }}
        columns={headers}
        data={providersTable ? providerData : childrenData}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                handleAddProvider(newData);
                resolve();
              }, 1000);
            }),
          onRowUpdate: null,
          onRowDelete: null,
        }}
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
