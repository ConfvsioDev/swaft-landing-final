import React, { CSSProperties } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { NextPage, NextPageContext } from 'next';

interface Props {
  statusCode: number;
}

const Error: NextPage<Props> = ({ statusCode }) => {
  const title = statusCode === 404 ? '404' : 'Error';

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div style={styles.root}>
        <h1>{title}</h1>
        <p>
          {statusCode === 404
            ? 'The page you are looking for could not be found.'
            : 'An error occurred.'}
        </p>
      </div>
    </>
  );
};

Error.getInitialProps = ({ res, req, err }: NextPageContext): Props => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  if (statusCode === 404) {
    if (req?.url?.match(/\/$/)) {
      const withoutTrailingSlash = req.url.substr(0, req.url.length - 1);
      if (res) {
        res.writeHead(303, {
          Location: withoutTrailingSlash
        });
        res.end();
      } else {
        Router.push(withoutTrailingSlash);
      }
    }
  }

  return { statusCode: statusCode as number };
};

const styles: { [key: string]: CSSProperties } = {
  root: {
    textAlign: 'center',
    padding: '2rem',
  },
};

export default Error;
