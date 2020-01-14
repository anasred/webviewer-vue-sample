<template>
  <div ref="viewer"></div>
</template>

<script>
/* eslint-disable */
export default {
  name: "WebViewer",
  props: {
    path: String,
    url: String
  },
  mounted: function() {
    WebViewer(
      {
        path: this.path,
        initialDoc: this.url // replace with your own PDF file
      },
      this.$refs.viewer
    ).then(instance => {
      // call apis here
      const { docViewer, annotManager } = instance;

      docViewer.on("documentLoaded", async () => {
        const doc = docViewer.getDocument();
        const xfdfString = await annotManager.exportAnnotations();
        const options = { xfdfString };
        const data = await doc.getFileData(options);
        const arr = new Uint8Array(data);
        const blob = new Blob([arr], { type: "application/pdf" });

        setTimeout(() => {
          console.log('xfdfString', xfdfString);
          window.saveAs(blob, "downloaded.pdf");
        }, 15000);
      });
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  width: 100%;
  height: 100vh;
}
</style>
