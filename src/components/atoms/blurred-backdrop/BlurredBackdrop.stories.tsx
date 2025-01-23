/* eslint-disable i18next/no-literal-string */

import type { Meta, StoryObj } from "@storybook/react";

import BlurredBackdrop from "./BlurredBackdrop";

const meta: Meta<typeof BlurredBackdrop> = {
  title: "UI/Atoms/Blurred backdrop helper",
  component: BlurredBackdrop,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BlurredBackdrop>;

export const Default: Story = {
  render: () => {
    return (
      <div>
        <div style={{ position: "sticky", top: 0, left: 0, right: 0 }}>
          <BlurredBackdrop />
          <div
            style={{
              display: "flex",
              gap: "2rem",
              padding: "2rem 3rem",
              position: "relative",
              zIndex: 1,
              backgroundColor: "rgba(196, 196, 224, 0.5)",
            }}
          >
            <span style={{ marginRight: "auto" }}>Home</span>
            <span>item 1</span>
            <span>item 2</span>
            <span>item 3</span>
            <span>item 4</span>
          </div>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec bibendum tortor sem.
          Praesent urna elit, ornare ut ipsum pharetra, fringilla consectetur velit. Sed mi lacus,
          dignissim ac quam sit amet, egestas vehicula diam. Praesent facilisis et erat eu viverra.
          Duis eleifend, neque sed posuere pulvinar, dui orci cursus arcu, eget mattis velit mi ac
          lorem. Sed sit amet mi quis lectus sollicitudin consequat aliquet sit amet eros. Donec
          condimentum nulla ut magna dignissim, sed ullamcorper urna efficitur. Pellentesque quis
          lorem magna. Suspendisse tempus massa vel nibh dignissim, vitae bibendum leo sagittis.
          Nullam a facilisis ex, ut facilisis tortor. Morbi ut orci urna. Cras magna urna, vulputate
          id facilisis id, elementum ut tellus. Duis laoreet purus sit amet tortor lacinia
          tincidunt.
        </p>
        <p>
          Vestibulum eleifend eros id lorem placerat, eu tincidunt urna luctus. Nunc id suscipit
          dolor. Curabitur quis interdum erat, sed semper lacus. Mauris elementum, magna vel
          condimentum rutrum, purus nisl tempor enim, non tincidunt tellus enim eu est. Morbi velit
          orci, hendrerit id convallis ut, semper pretium erat. Vestibulum euismod mattis vulputate.
          Donec ut ullamcorper diam, non aliquet nibh. Maecenas quam diam, mollis vitae magna eget,
          tincidunt faucibus augue. Vivamus vel efficitur justo. Mauris eu lorem id mauris fringilla
          luctus. Suspendisse ac nunc nibh. Donec in ex id odio tempor aliquam.
        </p>
        <p>
          Quisque eu bibendum enim. Duis elit odio, ullamcorper non ullamcorper non, mattis in erat.
          Nam sit amet libero nunc. Sed suscipit justo velit, nec sodales mi porttitor id. Aliquam
          iaculis enim et dignissim faucibus. Curabitur pretium efficitur metus. Ut ultrices leo
          quam, quis rhoncus tortor vulputate a. Nam laoreet felis ac nisl aliquam pulvinar. Duis
          interdum vestibulum sem, venenatis vulputate tortor tincidunt vitae.
        </p>
        <p>
          Nunc semper placerat erat, at luctus neque auctor sit amet. Sed iaculis mollis ultricies.
          Aliquam sit amet euismod odio. Curabitur ultrices euismod metus, gravida pharetra arcu
          tempor interdum. Praesent rhoncus arcu vitae est finibus ultrices. Nam imperdiet elementum
          risus, quis eleifend magna pellentesque ut. Pellentesque posuere ac urna efficitur
          sagittis.
        </p>
        <p>
          Sed fringilla augue in tellus condimentum fermentum. Quisque est tortor, porta ac
          tristique vitae, dignissim in elit. Phasellus pharetra condimentum ipsum eget sagittis.
          Maecenas sit amet vulputate lectus. Duis egestas cursus tortor, id vestibulum neque
          dapibus quis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur
          ridiculus mus. Nunc vestibulum ultrices tellus. Praesent eu massa auctor, sollicitudin
          metus ac, pellentesque massa. Vestibulum sit amet sodales neque. Nullam posuere est ac
          purus scelerisque vulputate eget sit amet lacus. Mauris bibendum, arcu in malesuada
          malesuada, lectus sapien porta eros, vel faucibus arcu magna nec nibh. Pellentesque
          lobortis quam eu metus ultrices, id pharetra magna efficitur. Etiam ornare non libero ac
          lobortis.
        </p>
        <p>
          Maecenas suscipit eros id nisi luctus, nec tempus leo condimentum. Aenean tempus egestas
          pulvinar. Curabitur dictum turpis ac dignissim facilisis. Nullam et erat et risus porta
          interdum. Nullam euismod elit ante, et aliquam justo malesuada nec. Nunc vitae pretium ex,
          eu congue lacus. Phasellus ac dictum leo. Nullam congue eu leo a pellentesque. Nunc
          vehicula eget massa a fringilla. Fusce sed placerat ex, sit amet sollicitudin ipsum.
          Nullam lacus risus, semper quis finibus in, vestibulum ullamcorper nisi. Nam placerat
          lorem non quam faucibus, nec pharetra lectus viverra. Aliquam rutrum magna quis nunc
          feugiat, a tempor ante condimentum.
        </p>
        <p>
          Praesent ac nibh mattis, ultricies lorem vel, pulvinar enim. Fusce ultrices dolor odio, ac
          ornare nulla viverra eu. Aenean cursus accumsan velit placerat fringilla. In massa mi,
          aliquet sit amet orci rhoncus, consequat semper libero. Donec sit amet ultrices ex.
          Aliquam ex dui, consectetur eu placerat quis, efficitur quis ante. Praesent vitae odio
          tincidunt, suscipit ex ac, congue dolor. Nulla facilisi. Pellentesque sed lacus eu tortor
          gravida tincidunt vehicula non nisi. Proin interdum posuere lacus, eu mollis erat suscipit
          non. Suspendisse malesuada quam porta, feugiat mi vitae, aliquet nunc. Sed posuere laoreet
          tortor eget ullamcorper. Vivamus nec sapien massa. Aliquam vitae suscipit quam, vel
          vulputate nisi.
        </p>
        <p>
          In elementum tempus ipsum et malesuada. Ut arcu ex, pharetra quis velit sit amet,
          facilisis scelerisque risus. Praesent dapibus nisl nibh, consectetur malesuada ante semper
          eu. Nam fringilla vel ex sit amet dapibus. Pellentesque habitant morbi tristique senectus
          et netus et malesuada fames ac turpis egestas. Nulla posuere urna ac nulla placerat, a
          tempor nulla mattis. Cras viverra tortor vitae egestas dapibus. Proin maximus dolor sit
          amet dui elementum, in malesuada felis tempus. Aliquam erat volutpat. Duis quis nisl
          vestibulum, sagittis ex ac, feugiat eros.
        </p>
        <p>
          Sed et justo vel massa dictum pharetra eu vitae urna. Nullam non lacus massa. Integer
          varius diam dui, quis congue arcu mollis quis. Quisque ut vestibulum tortor. Nam porta sem
          gravida nisi eleifend, eu ullamcorper elit placerat. Nulla lobortis rutrum gravida.
          Aliquam vel sem libero. Nullam tempor, quam blandit sagittis tincidunt, dolor velit rutrum
          metus, a posuere ante mi ut magna. Curabitur massa erat, dignissim in suscipit ut, euismod
          eget urna. Phasellus ornare, elit et porta pretium, urna dui pulvinar urna, sed elementum
          diam magna at augue. Etiam malesuada, est vitae rutrum tempus, elit ex lacinia risus, ac
          malesuada diam urna vitae lacus. In sed libero tempus, interdum libero sollicitudin,
          malesuada dui. Praesent vel nisi lacinia, finibus augue eget, dictum tellus. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
          Suspendisse potenti.
        </p>
        <p>
          Cras congue dolor eget cursus tempor. Morbi pretium sem ut tempus porta. Nam sapien nunc,
          euismod ut molestie vel, dignissim at ex. Etiam ut eleifend ligula. Morbi varius urna a
          aliquam efficitur. Donec commodo ante ac leo condimentum, eget condimentum urna dignissim.
          Sed commodo dignissim nisl vitae tempus. Praesent nec odio bibendum, auctor diam sed,
          bibendum risus. Praesent in dolor tristique, dapibus tellus eu, laoreet nunc. Interdum et
          malesuada fames ac ante ipsum primis in faucibus. Aliquam mauris tortor, lacinia ut
          sollicitudin eget, viverra in urna. Sed urna diam, euismod tincidunt blandit id, suscipit
          at est.
        </p>
      </div>
    );
  },
};
