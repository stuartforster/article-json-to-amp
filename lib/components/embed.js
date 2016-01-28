import { element } from 'deku';
import FigureCaption from './figure-caption';

function renderImage (props) {
  const width = props.width || 0;
  const height = props.height || 0;
  const src = props.src;

  if (!src || !width || !height) {
    return '';
  }

  return <amp-img width={width} height={height} layout='responsive' src={src}></amp-img>;
}

function renderYoutube (props) {
  const youtubeId = props.youtubeId;

  return (<amp-youtube
    data-videoid={youtubeId}
    layout='responsive'
    width={480} height={270}></amp-youtube>);
}

function renderFacebook (props) {
  const { url, embedAs } = props;

  if (embedAs === 'post') {
    return (<amp-facebook width={486} height={657}
      layout='responsive' data-embed-as='post'
      data-href={url}></amp-facebook>);
  }

  if (embedAs === 'video') {
    return (<amp-facebook width={480} height={270}
      layout='responsive' data-embed-as='video'
      data-href={url}></amp-facebook>);
  }

  return '';
}

function renderTwitter (props) {
  const { id } = props;

  return (<amp-twitter width={486} height={657}
    layout='responsive'
    data-tweetid={id}
    data-cards='hidden'>
  </amp-twitter>);
}

function renderVine (props) {
  const { id } = props;
  return <amp-vine width='400' height='250' layout='responsive' data-vineid={id}></amp-vine>;
}

function renderInstagram (props) {
  const { id } = props;

  return (<amp-instagram
    data-shortcode={id}
    width={400}
    height={400}
    layout='responsive'>
  </amp-instagram>);
}

const types = {
  image: renderImage,
  youtube: renderYoutube,
  facebook: renderFacebook,
  twitter: renderTwitter,
  vine: renderVine,
  instagram: renderInstagram
};

function render ({ props }) {
  const { embedType } = props;
  const embed = types[embedType] ? types[embedType](props) : '';

  const caption = (props.caption && props.caption.length > 0)
    ? <FigureCaption items={props.caption} /> : '';

  return <figure>{embed}{caption}</figure>;
}

export default { render };