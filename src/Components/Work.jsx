
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import A2B from '../assets/images/A2B_perth.png'
import thiraiflicks from '../assets/images/Thirai_flicks.png'
import Biriyabox from '../assets/images/Biriyani_box.png'

const projects = [
  {
    number: "01",
    name: "A2B Perth",
    category: "FOOD & HOSPITALITY",
    description:
      "Bringing South Indian vegetarian dining to a new audience through a welcoming digital presence and engaging visual content.",
    image: A2B,
    tags: ["Digital Presence", "Social Media", "Creative Content"],
  },
  {
    number: "02",
    name: "Thirai Flicks",
    category: "FILM & ENTERTAINMENT",
    description:
      "Connecting cinema and entertainment with audiences through digital experiences, promotional videos and social storytelling.",
    image: thiraiflicks,
    tags: ["Digital Marketing", "Video", "Social Media"],
  },
  {
    number: "03",
    name: "Biriyani Box",
    category: "FOOD & TAKEAWAY",
    description:
      "Creating a distinctive brand presence for a biriyani business through visual identity and promotional content.",
    image: Biriyabox,
    tags: ["Branding", "Creative Design", "Advertising"],
  },
];

const ease = [0.22, 1, 0.36, 1];

function ProjectCard({ project, index, reduced }) {
  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease,
      }}
      className="group min-w-0"
    >
      <a
        href="#contact"
        className="block"
        aria-label={`Enquire about ${project.name}`}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-champagne">
          <img
            src={project.image}
            alt={`${project.name} project`}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.visibility = "hidden";
            }}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          

          <span className="absolute bottom-5 right-5 z-10 grid h-12 w-12 place-items-center bg-deep-burgundy text-champagne transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:bg-antique-gold group-hover:text-deep-burgundy">
            <ArrowUpRight size={20} />
          </span>
        </div>
      </a>

      <div className="flex flex-col gap-4 border-b border-soft-border py-7">
        <p className="font-body text-[10px] font-semibold tracking-[0.2em] text-antique-rose">
          {project.category}
        </p>

        <div className="flex items-center justify-between gap-3">
          <h3 className="font-heading text-3xl font-medium text-rose-black md:text-4xl">
            {project.name}
          </h3>

          <ArrowUpRight
            size={21}
            className="shrink-0 text-antique-gold transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        </div>

        <p className="max-w-md font-body text-sm leading-7 text-muted">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="border border-soft-border px-3 py-2 font-body text-[10px] text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Work() {
  const reduced = useReducedMotion();

  return (
    <section
      id="work"
      className="w-full overflow-hidden bg-ivory px-5 py-24 sm:px-8 md:py-32 lg:px-[7%] border-32 border-deep-burgundy"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        {/* Heading */}
        <div className="mb-16 grid grid-cols-1 items-end gap-8 md:mb-20 md:grid-cols-[1.2fr_0.8fr] md:gap-16">
          <div>
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-6 font-body text-[10px] font-semibold tracking-[0.25em] text-antique-rose"
            >
              A SELECTION OF OUR WORK
            </motion.p>

            <motion.h2
              initial={reduced ? false : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="font-heading text-5xl font-medium leading-[1.05] tracking-tight text-rose-black sm:text-6xl lg:text-7xl"
            >
              Ideas brought
              <br />
              <span className="italic text-antique-rose">
                to life.
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="max-w-md font-body text-sm leading-8 text-muted md:ml-auto md:pb-2"
          >
            Every project starts with an idea. We bring together creativity,
            thoughtful design and digital experiences to make it memorable.
          </motion.p>
        </div>

        {/* Projects */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-7">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={index}
              reduced={reduced}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-soft-border pt-9 sm:flex-row sm:items-center">
          <h3 className="font-heading text-3xl italic text-rose-black md:text-4xl">
            Have a project in mind?
          </h3>

          <a
            href="#contact"
            className="inline-flex min-h-12 items-center gap-5 border border-burgundy bg-burgundy px-7 py-4 font-body text-[10px] font-semibold tracking-[0.15em] text-champagne transition-colors hover:bg-deep-burgundy"
          >
            LET'S CREATE TOGETHER
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
