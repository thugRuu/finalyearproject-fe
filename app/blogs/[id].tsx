import React from 'react';
import { Text, View , ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BlogScreen: React.FC = () => {
  // Use the useRoute hook to access the route params
  const route = useRoute();
  
  // Access the dynamic 'id' parameter from the route params
  const { id } = route.params as { id: string };

  return (
    <SafeAreaView className="flex-1 bg-white">
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View className="mb-8">
        {/* Blog Title */}
        <Text className="text-3xl font-bold text-gray-800 mb-4">Title of the Blog: {id}</Text>
        
        {/* Author and Date */}
        <Text className="text-lg text-gray-600 mb-2">Author Name</Text>
        <Text className="text-sm text-gray-400 mb-4">Date</Text>

        {/* Blog Content */}
        <Text className="text-base text-gray-700 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus accusantium rerum quas! 
          Voluptatem officia optio ipsum qui saepe, amet provident quibusdam nesciunt. Dicta corrupti 
          autem sapiente voluptatum obcaecati, ipsum minima quaerat voluptates, hic, asperiores rerum 
          soluta quibusdam! Libero assumenda nisi in repellendus fugiat corporis, facilis soluta optio 
          modi illo commodi fuga consequatur iure ducimus rem reprehenderit laborum voluptates iusto aperiam 
          repudiandae architecto qui! Qui ad expedita nostrum aspernatur architecto est sed id at. Sint 
          fugit inventore asperiores nisi voluptatem blanditiis illo quis error sapiente provident dolores 
          non accusantium nobis molestias, tempora magni vero, libero id neque fuga ipsa, eveniet dolor! 
          Delectus placeat ab, deleniti maiores, at incidunt, fugiat minima iusto soluta provident atque eligendi! 
          Laborum rerum sit molestiae harum, deleniti rem ullam. Nulla est corrupti culpa laborum odio nemo 
          tempore! Tenetur doloremque beatae consectetur qui odit. Illum quos, quidem libero suscipit natus 
          quaerat nesciunt, optio minus debitis nemo perferendis beatae. Optio minima illo obcaecati aspernatur 
          minus. Similique voluptates aperiam qui vel amet voluptatibus accusantium unde animi et facilis 
          praesentium nihil vero impedit consequuntur, laboriosam rem natus. Molestiae facere doloribus labore 
          unde debitis ad aperiam ducimus non accusamus. Distinctio libero sint officia et autem recusandae 
          eos debitis optio velit impedit excepturi ea temporibus laudantium, assumenda at vitae obcaecati quas 
          quos consequuntur accusantium? Recusandae molestiae quia nisi nihil excepturi, deleniti nesciunt ut 
          obcaecati eos libero rem voluptate incidunt cupiditate culpa voluptates accusantium aperiam aut 
          praesentium et alias. Labore, perferendis officia possimus officiis distinctio amet molestias deleniti 
          quis cum. Obcaecati deserunt numquam neque molestiae dolorum illum, voluptatum consectetur nam cumque 
          necessitatibus quisquam sint error! Sunt delectus suscipit obcaecati fuga, blanditiis, possimus recusandae 
          ea ducimus eaque doloremque dolores, hic at distinctio est. Sed dignissimos consectetur veniam soluta 
          provident maiores expedita officiis quam obcaecati perferendis debitis eligendi, eveniet ea facere 
          quibusdam. Omnis explicabo dolores numquam, mollitia neque quasi illum minima quia, quos cumque rem 
          ad nostrum ducimus labore optio quam itaque, quod voluptate nisi. Suscipit fugit deleniti vel? Unde 
          reiciendis, porro nostrum repudiandae natus illo voluptates iusto itaque quidem temporibus explicabo 
          quam sunt voluptatum? Minima unde enim id placeat nostrum quisquam molestias labore quasi atque doloribus, 
          adipisci nulla mollitia totam quis error reprehenderit, ipsum nihil dolore? Deserunt pariatur ea eum dicta, 
          cum consequuntur ipsam! Minus natus, ducimus ut fugit suscipit assumenda consequatur porro non expedita 
          eaque obcaecati ad officiis. Esse, laborum. Quidem praesentium ducimus corporis nisi, quae, esse perspiciatis 
          earum velit quisquam recusandae, et nam!
        </Text>
      </View>
    </ScrollView>
  </SafeAreaView>
  );
};

export default BlogScreen;
