import React from 'react';
import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import DataTable from './DataTable';

const title = 'Test Title';
const headers = [
  { title: 'Name', field: 'name' },
  { title: 'Email', field: 'email' },
];
const providers = [
  {
    slug: 'prv_RL7sGuvPcJateiIw',
    name: 'Bernadette Collum',
    email: 'bcollum0@mailinator.com',
    avatarURL: 'https://i.pravatar.cc/150?u=U22zMxIp1KIonKck',
    postcode: 'XK5 345 ',
    address: '6 Orin Point',
    city: 'Tengqiao',
    dob: '1964-08-26T03:57:01Z',
    registrationDate: '2018-06-22T09:39:16Z',
    enrollments: [
      {
        childSlug: 'chd_RcUUf7aA6vyvY8hl',
        startDate: '2019-07-15T23:36:50Z',
      },
      {
        childSlug: 'chd_aeCPfQTpk34DB83G',
        startDate: '2019-06-23T18:07:58Z',
      },
    ],
  },
  {
    slug: 'prv_GTwOsQ18uYdLRAyG',
    name: 'Koralle Grigorio',
    email: 'kgrigorio1@mailinator.com',
    avatarURL: 'https://i.pravatar.cc/150?u=owYex2fUjUhYTbWk',
    postcode: 'UGR FLW ',
    address: '645 Oriole Point',
    city: 'Nantes',
    dob: '1963-11-15T06:15:11Z',
    registrationDate: '2019-10-08T15:42:26Z',
    enrollments: [],
  },
  {
    slug: 'prv_Wwe3npaab7H0jRnk',
    name: 'Dave Ianniello',
    email: 'dianniello2@mailinator.com',
    avatarURL: 'https://i.pravatar.cc/150?u=BHnzJn1kpsgbATht',
    postcode: 'V2Y P94 ',
    address: '8 Melody Hill',
    city: 'Vitrolles',
    dob: '1963-03-25T00:51:58Z',
    registrationDate: '2019-04-26T21:03:40Z',
    enrollments: [
      {
        childSlug: 'chd_jYjuJdNrnm7TLdex',
        startDate: '2018-12-02T15:49:38Z',
      },
      {
        childSlug: 'chd_huTavWtYMSVBdxHw',
        startDate: '2018-05-26T18:05:12Z',
      },
      {
        childSlug: 'chd_Vv5qqvHnQZa7m146',
        startDate: '2018-06-10T21:02:34Z',
      },
      {
        childSlug: 'chd_TAOyNX3xzU343Wxi',
        startDate: '2018-06-17T10:23:27Z',
      },
      {
        childSlug: 'chd_D7BdV6kU2iETdHJ7',
        startDate: '2019-03-10T22:50:06Z',
      },
    ],
  },
];

const children = [
  {
    slug: 'chd_RcUUf7aA6vyvY8hl',
    name: 'Rennie Floweth',
    guardians: [
      {
        slug: 'grd_kBEnL94XYsHljKFp',
        name: 'Nevsa Buff',
        email: 'nbuff0@ibm.com',
        avatarURL: 'https://i.pravatar.cc/150?u=HWmyUYOOLIUkUj2z',
      },
    ],
  },
  {
    slug: 'chd_aeCPfQTpk34DB83G',
    name: 'Ronny Pursglove',
    guardians: [
      {
        slug: 'grd_QOnTfhNc4jFBuAQQ',
        name: 'Keary Chaudhry',
        email: 'kchaudhry0@tmall.com',
        avatarURL: 'https://i.pravatar.cc/150?u=bif77DH6N3GsbZQO',
      },
    ],
  },
];

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('DataTable', () => {
  test('renders DataTable component', () => {
    render(
      <DataTable
        title={title}
        headers={headers}
        kids={children}
        providers={providers}
        providersTable
      />,
    );
    expect(screen.getByText('Bernadette Collum')).toBeInTheDocument();
  });
});
