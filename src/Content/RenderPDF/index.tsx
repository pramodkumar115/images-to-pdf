import { Text, Document, Page, Image, Font, StyleSheet, View } from '@react-pdf/renderer';
import React from 'react';
import { FileWithPath } from 'react-dropzone';

const RenderPDF: React.FC<{ images: FileWithPath[], pageBreak: boolean }> = ({ images, pageBreak }) => {
  console.log({ pageBreak });
  return <Document>
    {!pageBreak ? <Page size="A4" style={styles.body}>
      {images?.map((image, index) => <View key={index}>{getImageContent({ pageBreak, image })}</View>)}
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
    </Page>
      :
      <>{images?.map((image, index) => <Page size="A4" key={index} style={styles.body}>
        <View>
        {getImageContent({ pageBreak, image })}
        </View>
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
        
      </Page>)}

      </>
    }

  </Document>
};

const getImageContent: React.FC<{ pageBreak: boolean, image: FileWithPath }> = ({ pageBreak, image }) => {
  console.log({pageBreak});
  return <><Image style={{maxHeight: "100vh"}}
    src={URL.createObjectURL(image)}
  />
  </>
}

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
  body: {
    //   paddingTop: 35,
    //   paddingBottom: 65,
    //   paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald'
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

export default RenderPDF;